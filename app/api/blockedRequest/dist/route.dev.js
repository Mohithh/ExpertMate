"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PUT = PUT;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/testConnect/page"));

var _page2 = _interopRequireDefault(require("@/model/UserRequest/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// adjust path
// adjust path
function PUT(request) {
  var body, userEmail, facultyEmail, status, filter, update, result;
  return regeneratorRuntime.async(function PUT$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _page["default"])());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(request.json());

        case 5:
          body = _context.sent;
          userEmail = body.userEmail, facultyEmail = body.facultyEmail, status = body.status; // Validate input

          if (!(!userEmail || !facultyEmail || !status)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "userEmail, facultyEmail, and status are required"
          }, {
            status: 400
          }));

        case 9:
          // Define update condition and new status
          filter = {
            userEmail: userEmail,
            facultyEmail: facultyEmail
          };
          update = {};

          if (!(status === "Blocked")) {
            _context.next = 15;
            break;
          }

          update = {
            status: "Blocked"
          }; // block all

          _context.next = 21;
          break;

        case 15:
          if (!(status === "Unblocked")) {
            _context.next = 20;
            break;
          }

          filter.status = "Blocked"; // only unblock blocked ones

          update = {
            status: "Pending"
          }; // unblock = set to pending

          _context.next = 21;
          break;

        case 20:
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Invalid status. Use 'Blocked' or 'Unblocked' only."
          }, {
            status: 400
          }));

        case 21:
          _context.next = 23;
          return regeneratorRuntime.awrap(_page2["default"].updateMany(filter, {
            $set: update
          }));

        case 23:
          result = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Status updated successfully for ".concat(result.modifiedCount, " request(s)"),
            modifiedCount: result.modifiedCount
          }, {
            status: 200
          }));

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](0);
          console.error("Error in block/unblock update:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Internal server error"
          }, {
            status: 500
          }));

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 27]]);
}