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
  var _ref, senderEmail, receiverEmail, chats;

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
          senderEmail = _ref.senderEmail;
          receiverEmail = _ref.receiverEmail;

          if (!(!senderEmail || !receiverEmail)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "Both senderEmail and receiverEmail are required"
          }, {
            status: 400
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(_page["default"].find({
            $or: [{
              senderEmail: senderEmail,
              receiverEmail: receiverEmail
            }, // sender -> receiver
            {
              senderEmail: receiverEmail,
              receiverEmail: senderEmail
            } // receiver -> sender
            ]
          }).sort({
            createdAt: 1
          }));

        case 12:
          chats = _context.sent;

          if (!(chats.length === 0)) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            message: "No chats found between these users"
          }, {
            status: 404
          }));

        case 15:
          return _context.abrupt("return", _server.NextResponse.json({
            chats: chats
          }, {
            status: 200
          }));

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching chats:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Server error"
          }, {
            status: 500
          }));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}