"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// model/UploadImage/page.js
var FileSchema = new _mongoose["default"].Schema({
  filename: String,
  contentType: String,
  fileBase64: String,
  isImage: Boolean
}, {
  timestamps: true
});

var FileModel = _mongoose["default"].models.FileModel || _mongoose["default"].model("FileModel", FileSchema);

exports.FileModel = FileModel;