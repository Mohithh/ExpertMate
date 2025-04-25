"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fileSchema = new _mongoose["default"].Schema({
  email: String,
  image: {
    filename: String,
    contentType: String,
    fileBase64: String
  },
  file: {
    filename: String,
    contentType: String,
    fileBase64: String
  }
}, {
  timestamps: true
});

var FileModel = _mongoose["default"].models.File || _mongoose["default"].model("File", fileSchema);

exports.FileModel = FileModel;