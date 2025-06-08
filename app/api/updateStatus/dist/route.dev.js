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
  var body, _id, userEmail, facultyEmail, status, requestToUpdate;

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
          _id = body._id, userEmail = body.userEmail, facultyEmail = body.facultyEmail, status = body.status; // Validate

          if (!(!userEmail || !facultyEmail || !_id || !status)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "userEmail, facultyEmail, _id, and status are all required."
          }, {
            status: 400
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_page2["default"].findOne({
            _id: _id,
            userEmail: userEmail,
            facultyEmail: facultyEmail
          }));

        case 11:
          requestToUpdate = _context.sent;

          if (requestToUpdate) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "No matching request found for provided details."
          }, {
            status: 404
          }));

        case 14:
          // Update the status
          requestToUpdate.status = status;
          _context.next = 17;
          return regeneratorRuntime.awrap(requestToUpdate.save());

        case 17:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Request status updated successfully",
            data: requestToUpdate
          }, {
            status: 200
          }));

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error("Error updating request:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Failed to update status"
          }, {
            status: 500
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
}