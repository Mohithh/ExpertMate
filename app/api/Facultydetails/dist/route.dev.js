"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _page = _interopRequireDefault(require("@/model/facultyDetails/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDb = function connectDb() {
  return regeneratorRuntime.async(function connectDb$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!_mongoose["default"].connections[0].readyState) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var POST = function POST(req) {
  var body, newFaculty, savedFaculty;
  return regeneratorRuntime.async(function POST$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(connectDb());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(req.json());

        case 5:
          body = _context2.sent;
          newFaculty = new _page["default"]({
            email: body.email,
            name: body.name,
            description: body.description,
            mobile: body.mobile,
            // ✅ NEW FIELD
            country: body.country,
            city: body.city,
            profession: body.profession,
            professionCategory: body.professionCategory,
            gender: body.gender,
            experience: body.experience,
            age: body.age,
            workingMode: body.workingMode,
            jobType: body.jobType
          });
          _context2.next = 9;
          return regeneratorRuntime.awrap(newFaculty.save());

        case 9:
          savedFaculty = _context2.sent;
          return _context2.abrupt("return", new Response(JSON.stringify({
            success: true,
            message: "Faculty details stored successfully!",
            data: savedFaculty
          }), {
            status: 201,
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error("Error:", _context2.t0);
          return _context2.abrupt("return", new Response(JSON.stringify({
            success: false,
            error: "Error saving faculty details"
          }), {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.POST = POST;