(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../Resource'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../Resource'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource);
    global.Bookings = mod.exports;
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

  var Bookings = function (_Resource) {
    (0, _inherits3.default)(Bookings, _Resource);

    function Bookings(api) {
      (0, _classCallCheck3.default)(this, Bookings);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Bookings.__proto__ || (0, _getPrototypeOf2.default)(Bookings)).call(this, api));

      _this.source = 'reports';

      _this.endpoint = 'bookings';
      return _this;
    }

    /**
     * Request booking report
     *
     * @param {int} venueId
     * @param {string} type
     * @param {date} start
     * @param {date} end
     * @param {string} interval
     * @param {bool} task
     * @return {Object[]} - job / result.
     */


    (0, _createClass3.default)(Bookings, [{
      key: 'enquire',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              venueId = _ref2.venueId,
              type = _ref2.type,
              start = _ref2.start,
              end = _ref2.end,
              interval = _ref2.interval,
              filter = _ref2.filter,
              _ref2$task = _ref2.task,
              task = _ref2$task === undefined ? false : _ref2$task;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'POST',
                    path: this.endpoint + '/' + venueId + '/' + type + '?task=' + task.toString(),
                    params: {
                      task: task
                    },
                    body: {
                      type: type,
                      start: start,
                      end: end,
                      interval: interval,
                      filter: filter
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

        function enquire() {
          return _ref.apply(this, arguments);
        }

        return enquire;
      }()
    }, {
      key: 'retrieve',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              venueId = _ref4.venueId,
              type = _ref4.type,
              jobId = _ref4.jobId;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    method: 'GET',
                    path: this.endpoint + '/' + venueId + '/' + type + '/' + jobId
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

        function retrieve() {
          return _ref3.apply(this, arguments);
        }

        return retrieve;
      }()
    }]);
    return Bookings;
  }(_Resource3.default);

  exports.default = Bookings;
  module.exports = exports['default'];
});