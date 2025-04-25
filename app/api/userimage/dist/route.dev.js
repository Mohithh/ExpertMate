"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _page = require("@/model/UploadImage/page");

var _page2 = _interopRequireDefault(require("@/testConnect/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(req) {
  var _ref, email, userData;

  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _page2["default"])());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(req.json());

        case 4:
          _ref = _context.sent;
          email = _ref.email;

          if (email) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "Email is required!"
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_page.FileModel.findOne({
            email: email
          }));

        case 10:
          userData = _context.sent;

          if (userData) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "No data found for this email."
          }));

        case 13:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            data: userData
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}