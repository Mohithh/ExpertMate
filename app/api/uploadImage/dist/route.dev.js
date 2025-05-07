"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
exports.config = void 0;

var _server = require("next/server");

var _page = require("@/model/UploadImage/page");

var _page2 = _interopRequireDefault(require("@/testConnect/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  api: {
    bodyParser: false
  }
};
exports.config = config;

function POST(req) {
  var formData, email, image, file, imageBuffer, fileBuffer, updatedData, result;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _page2["default"])());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(req.formData());

        case 5:
          formData = _context.sent;
          email = formData.get("email");
          image = formData.get("image");
          file = formData.get("file");

          if (!(!email || !image || !file)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "Email, image, and file are required!"
          }));

        case 11:
          _context.t0 = Buffer;
          _context.next = 14;
          return regeneratorRuntime.awrap(image.arrayBuffer());

        case 14:
          _context.t1 = _context.sent;
          imageBuffer = _context.t0.from.call(_context.t0, _context.t1);
          _context.t2 = Buffer;
          _context.next = 19;
          return regeneratorRuntime.awrap(file.arrayBuffer());

        case 19:
          _context.t3 = _context.sent;
          fileBuffer = _context.t2.from.call(_context.t2, _context.t3);
          updatedData = {
            email: email,
            image: {
              filename: image.name,
              contentType: image.type,
              fileBase64: imageBuffer.toString("base64")
            },
            file: {
              filename: file.name,
              contentType: file.type,
              fileBase64: fileBuffer.toString("base64")
            }
          };
          _context.next = 24;
          return regeneratorRuntime.awrap(_page.FileModel.findOneAndUpdate({
            email: email
          }, updatedData, {
            upsert: true,
            "new": true
          }));

        case 24:
          result = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            message: result ? "Updated successfully" : "Created new entry"
          }));

        case 28:
          _context.prev = 28;
          _context.t4 = _context["catch"](0);
          console.error("Upload error:", _context.t4);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "Server error",
            error: _context.t4.message || "Unknown error"
          }));

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 28]]);
}