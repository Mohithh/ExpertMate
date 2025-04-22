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
  var formData, file, buffer, base64, isImage, newFile;
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
          file = formData.get("file");

          if (file) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            message: "No file provided"
          }));

        case 8:
          _context.t0 = Buffer;
          _context.next = 11;
          return regeneratorRuntime.awrap(file.arrayBuffer());

        case 11:
          _context.t1 = _context.sent;
          buffer = _context.t0.from.call(_context.t0, _context.t1);
          base64 = buffer.toString("base64");
          isImage = file.type.startsWith("image/");
          newFile = new _page.FileModel({
            filename: file.name,
            contentType: file.type,
            fileBase64: base64,
            isImage: isImage
          });
          _context.next = 18;
          return regeneratorRuntime.awrap(newFile.save());

        case 18:
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            message: "".concat(isImage ? "Image" : "File", " uploaded")
          }));

        case 19:
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