"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _server = require("next/server");

var _page = _interopRequireDefault(require("@/model/chat/page"));

var _page2 = _interopRequireDefault(require("@/testConnect/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// your MongoDB connection file
function POST(req) {
  var reqBody, senderEmail, receiverEmail, text, newChat;
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
          reqBody = _context.sent;
          senderEmail = reqBody.senderEmail, receiverEmail = reqBody.receiverEmail, text = reqBody.text; // ✅ fixed here

          if (!(!senderEmail || !receiverEmail || !text)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "All fields are required"
          }, {
            status: 400
          }));

        case 9:
          newChat = new _page["default"]({
            senderEmail: senderEmail,
            receiverEmail: receiverEmail,
            text: text
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(newChat.save());

        case 12:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Chat saved",
            chat: newChat
          }, {
            status: 201
          }));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Error saving chat:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Server error"
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