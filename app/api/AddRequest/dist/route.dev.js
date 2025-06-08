"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/testConnect/page"));

var _page2 = _interopRequireDefault(require("@/model/UserRequest/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// adjust path
// adjust path
function POST(request) {
  var data, requiredFields, _i, _requiredFields, field, newRequest;

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
          data = _context.sent;
          requiredFields = ["name", "userEmail", "facultyEmail", "category", "subject", "message", "urgency", "status", "mainCategory", "categoryType"];
          _i = 0, _requiredFields = requiredFields;

        case 8:
          if (!(_i < _requiredFields.length)) {
            _context.next = 15;
            break;
          }

          field = _requiredFields[_i];

          if (data[field]) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "".concat(field, " is required")
          }, {
            status: 400
          }));

        case 12:
          _i++;
          _context.next = 8;
          break;

        case 15:
          // expectedResponseDate is optional, but if provided, it will be stored
          // You can add additional validation if needed
          newRequest = new _page2["default"](data);
          _context.next = 18;
          return regeneratorRuntime.awrap(newRequest.save());

        case 18:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Request added successfully",
            data: newRequest
          }, {
            status: 201
          }));

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.error("Error in POST /userRequest:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Failed to add request"
          }, {
            status: 500
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}