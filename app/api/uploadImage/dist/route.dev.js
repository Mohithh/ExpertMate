"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
exports.GET = GET;
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
  var formData, email, image, file, imageBuffer, fileBuffer, newEntry;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _page2["default"])());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(req.formData());

        case 4:
          formData = _context.sent;
          email = formData.get("email");
          image = formData.get("image");
          file = formData.get("file");

          if (!(!email || !image || !file)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "Email, image, and file are required!"
          }));

        case 10:
          _context.t0 = Buffer;
          _context.next = 13;
          return regeneratorRuntime.awrap(image.arrayBuffer());

        case 13:
          _context.t1 = _context.sent;
          imageBuffer = _context.t0.from.call(_context.t0, _context.t1);
          _context.t2 = Buffer;
          _context.next = 18;
          return regeneratorRuntime.awrap(file.arrayBuffer());

        case 18:
          _context.t3 = _context.sent;
          fileBuffer = _context.t2.from.call(_context.t2, _context.t3);
          newEntry = new _page.FileModel({
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
          });
          _context.next = 23;
          return regeneratorRuntime.awrap(newEntry.save());

        case 23:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            message: "Uploaded successfully"
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
}

function GET() {
  var files;
  return regeneratorRuntime.async(function GET$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _page2["default"])());

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(_page.FileModel.find().sort({
            createdAt: -1
          }));

        case 4:
          files = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json(files));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}