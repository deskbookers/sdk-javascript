(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', './Resource'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('./Resource'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource);
    global.Availability = mod.exports;
  }
})(this, function (module, exports, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _Resource3 = _interopRequireDefault(_Resource2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Availability = function (_Resource) {
    (0, _inherits3.default)(Availability, _Resource);

    function Availability() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Availability);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Availability.__proto__ || (0, _getPrototypeOf2.default)(Availability)).call.apply(_ref, [this].concat(args))), _this), _this.source = 'availability', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Availability, [{
      key: 'retrieve',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
          var start = _ref3.start,
              end = _ref3.end,
              venueId = _ref3.venueId,
              _ref3$noCache = _ref3.noCache,
              noCache = _ref3$noCache === undefined ? false : _ref3$noCache;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    path: 'venues/' + venueId,
                    params: {
                      noCache: noCache,
                      start: start,
                      end: end
                    }
                  });

                case 2:
                  return _context.abrupt('return', _context.sent);

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function retrieve(_x) {
          return _ref2.apply(this, arguments);
        }

        return retrieve;
      }()
    }, {
      key: 'retrieveForFullCalendar',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
          var start = _ref5.start,
              end = _ref5.end,
              spaceId = _ref5.spaceId,
              _ref5$enableOpenHours = _ref5.enableOpenHours,
              enableOpenHours = _ref5$enableOpenHours === undefined ? false : _ref5$enableOpenHours,
              _ref5$remapToSimple = _ref5.remapToSimple,
              remapToSimple = _ref5$remapToSimple === undefined ? false : _ref5$remapToSimple,
              _ref5$noCache = _ref5.noCache,
              noCache = _ref5$noCache === undefined ? false : _ref5$noCache;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    path: 'spaces/' + spaceId + '/fullCalendar',
                    params: {
                      noCache: noCache,
                      start: start,
                      end: end,
                      enableOpenHours: enableOpenHours,
                      remapToSimple: remapToSimple
                    }
                  });

                case 2:
                  return _context2.abrupt('return', _context2.sent);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function retrieveForFullCalendar(_x2) {
          return _ref4.apply(this, arguments);
        }

        return retrieveForFullCalendar;
      }()
    }]);
    return Availability;
  }(_Resource3.default);

  exports.default = Availability;
  module.exports = exports['default'];
});