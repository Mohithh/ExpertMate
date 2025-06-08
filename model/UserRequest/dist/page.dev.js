"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRequestSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  facultyEmail: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // e.g., Mentorship
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    required: true
  },
  expectedResponseDate: {
    type: String,
    "default": ""
  },
  status: {
    type: String,
    required: true
  },
  mainCategory: {
    type: String,
    required: true
  },
  categoryType: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var UserRequest = _mongoose["default"].models.UserRequest || _mongoose["default"].model("UserRequest", userRequestSchema);

var _default = UserRequest;
exports["default"] = _default;