"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chatSchema = new _mongoose["default"].Schema({
  senderEmail: {
    type: String,
    required: true
  },
  receiverEmail: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Chat = _mongoose["default"].models.Chat || _mongoose["default"].model("Chat", chatSchema);

var _default = Chat;
exports["default"] = _default;