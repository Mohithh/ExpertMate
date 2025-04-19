"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/model/facultyDetails/page"));

var _page2 = _interopRequireDefault(require("@/testConnect/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// /app/api/doctorList/route.js
// adjust the path if needed
// assumes you have a MongoDB connection file
function GET() {
  var doctors;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _page2["default"])());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_page["default"].find({
            profession: "doctor"
          }));

        case 5:
          doctors = _context.sent;

          if (!(doctors.length === 0)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "No doctors found."
          }, {
            status: 404
          }));

        case 8:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            data: doctors
          }, {
            status: 200
          }));

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error("❌ Error fetching doctors:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "Internal Server Error"
          }, {
            status: 500
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}