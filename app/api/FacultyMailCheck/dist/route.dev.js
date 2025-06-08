"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/model/facultyLogin/page"));

var _page2 = _interopRequireDefault(require("@/testConnect/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Ensure you have a DB connection utility
function POST(req) {
  var body, email, faculty;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _page2["default"])());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(req.json());

        case 5:
          body = _context.sent;
          email = body.email;

          if (email) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "Email is required"
          }, {
            status: 400
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_page["default"].findOne({
            email: email
          }));

        case 11:
          faculty = _context.sent;

          if (!faculty) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            exists: true,
            message: "Faculty found"
          }));

        case 16:
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            exists: false,
            message: "Unauthorized: Faculty not found"
          }, {
            status: 401
          } // Unauthorized
          ));

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error("Error checking faculty email:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "Server error"
          }, {
            status: 500
          }));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}