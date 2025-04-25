"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var facultyDetailsSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  professionCategory: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  workingMode: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var FacultyDetails = _mongoose["default"].models.FacultyDetails || _mongoose["default"].model("FacultyDetails", facultyDetailsSchema);

var _default = FacultyDetails;
exports["default"] = _default;