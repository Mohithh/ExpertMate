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
  var _ref, userEmail, requests;

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
          userEmail = _ref.userEmail;

          if (userEmail) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "userEmail is required"
          }, {
            status: 400
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_page2["default"].find({
            userEmail: userEmail
          }).sort({
            createdAt: -1
          }));

        case 11:
          requests = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            requests: requests
          }, {
            status: 200
          }));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching requests:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Internal server error"
          }, {
            status: 500
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}