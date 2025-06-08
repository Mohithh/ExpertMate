"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/model/UserRequest/page"));

var _page2 = _interopRequireDefault(require("@/testConnect/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// app/api/getRequestDetails/route.js
// adjust path
// your MongoDB connection utility
function POST(req) {
  var _ref, id, requestData;

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
          _ref = _context.sent;
          id = _ref.id;

          if (id) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            error: 'ID is required'
          }, {
            status: 400
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_page["default"].findById(id));

        case 11:
          requestData = _context.sent;

          if (requestData) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            error: 'Request not found'
          }, {
            status: 404
          }));

        case 14:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            data: requestData
          }, {
            status: 200
          }));

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching request:', _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            error: 'Internal Server Error'
          }, {
            status: 500
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
}