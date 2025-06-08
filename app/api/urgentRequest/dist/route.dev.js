"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/testConnect/page"));

var _page2 = _interopRequireDefault(require("@/model/UserRequest/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(req) {
  var _ref, facultyEmail, requests;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _page["default"])());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(req.json());

        case 5:
          _ref = _context.sent;
          facultyEmail = _ref.facultyEmail;
          _context.next = 9;
          return regeneratorRuntime.awrap(_page2["default"].find({
            facultyEmail: facultyEmail,
            urgency: "High"
          }));

        case 9:
          requests = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            requests: requests
          }, {
            status: 200
          }));

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching urgent requests:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Server error"
          }, {
            status: 500
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}