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
  var _ref, name, userEmail, facultyEmail, category, subject, message, urgency, expectedResponseDate, status, mainCategory, categoryType, isBlocked, newRequest;

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
          name = _ref.name;
          userEmail = _ref.userEmail;
          facultyEmail = _ref.facultyEmail;
          category = _ref.category;
          subject = _ref.subject;
          message = _ref.message;
          urgency = _ref.urgency;
          expectedResponseDate = _ref.expectedResponseDate;
          status = _ref.status;
          mainCategory = _ref.mainCategory;
          categoryType = _ref.categoryType;
          _context.next = 19;
          return regeneratorRuntime.awrap(_page2["default"].findOne({
            userEmail: userEmail,
            facultyEmail: facultyEmail,
            status: "blocked"
          }));

        case 19:
          isBlocked = _context.sent;

          if (!isBlocked) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "You have been blocked by this faculty member."
          }, {
            status: 403
          }));

        case 22:
          newRequest = new _page2["default"]({
            name: name,
            userEmail: userEmail,
            facultyEmail: facultyEmail,
            category: category,
            subject: subject,
            message: message,
            urgency: urgency,
            expectedResponseDate: expectedResponseDate,
            status: status,
            mainCategory: mainCategory,
            categoryType: categoryType
          });
          _context.next = 25;
          return regeneratorRuntime.awrap(newRequest.save());

        case 25:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Request sent successfully",
            request: newRequest
          }, {
            status: 201
          }));

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](0);
          console.error("Error creating request:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Server error. Please try again later."
          }, {
            status: 500
          }));

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 28]]);
}