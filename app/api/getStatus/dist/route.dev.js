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
  var body, userEmail, facultyEmail, status, query, requests;
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
          userEmail = body.userEmail, facultyEmail = body.facultyEmail, status = body.status;

          if (!(!userEmail && !facultyEmail || !status)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "Please provide either userEmail or facultyEmail along with status"
          }, {
            status: 400
          }));

        case 9:
          query = {
            status: status
          };

          if (userEmail) {
            query.userEmail = userEmail;
          } else if (facultyEmail) {
            query.facultyEmail = facultyEmail;
          }

          if (!(status === "Blocked")) {
            _context.next = 16;
            break;
          }

          _context.next = 14;
          return regeneratorRuntime.awrap(_page2["default"].findOne(query).sort({
            createdAt: -1
          }));

        case 14:
          requests = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: requests ? "Blocked status fetched" : "No blocked request found",
            data: requests ? [requests] : []
          }, {
            status: 200
          }));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(_page2["default"].find(query).sort({
            createdAt: -1
          }));

        case 18:
          requests = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            message: requests.length > 0 ? "Filtered requests fetched successfully" : "No matching requests found",
            data: requests
          }, {
            status: 200
          }));

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error("Error filtering user requests:", _context.t0);
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