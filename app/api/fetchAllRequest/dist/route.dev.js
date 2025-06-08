"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/testConnect/page"));

var _page2 = _interopRequireDefault(require("@/model/UserRequest/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(request) {
  var body, requests;
  return regeneratorRuntime.async(function POST$(_context) {
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

          if (!body.userEmail) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(_page2["default"].find({
            userEmail: body.userEmail
          }).sort({
            createdAt: -1
          }));

        case 9:
          requests = _context.sent;
          _context.next = 19;
          break;

        case 12:
          if (!body.facultyEmail) {
            _context.next = 18;
            break;
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(_page2["default"].find({
            facultyEmail: body.facultyEmail
          }).sort({
            createdAt: -1
          }));

        case 15:
          requests = _context.sent;
          _context.next = 19;
          break;

        case 18:
          return _context.abrupt("return", _server.NextResponse.json({
            error: "userEmail or facultyEmail is required"
          }, {
            status: 400
          }));

        case 19:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Requests fetched successfully",
            data: requests
          }, {
            status: 200
          }));

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching user requests:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Failed to fetch requests"
          }, {
            status: 500
          }));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
}