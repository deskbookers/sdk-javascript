(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/promise', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../Resource', 'lodash/get'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/promise'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../Resource'), require('lodash/get'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.promise, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.get);
    global.BookingReferrers = mod.exports;
  }
})(this, function (module, exports, _promise, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _get) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _promise2 = _interopRequireDefault(_promise);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _Resource3 = _interopRequireDefault(_Resource2);

  var _get2 = _interopRequireDefault(_get);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var AUTO_RETRIEVE_TIMEOUT = 1000;

  var BookingReferrers = function (_Resource) {
    (0, _inherits3.default)(BookingReferrers, _Resource);

    function BookingReferrers(api) {
      (0, _classCallCheck3.default)(this, BookingReferrers);

      var _this = (0, _possibleConstructorReturn3.default)(this, (BookingReferrers.__proto__ || (0, _getPrototypeOf2.default)(BookingReferrers)).call(this, api));

      _this.source = 'reports';

      _this.endpoint = 'bookingReferrers';
      return _this;
    }

    /**
     * Request booking referrer report
     *
     * @param {date} start
     * @param {date} end
     * @param {bool} autoRetrieve
     * @param {callback} onProgress
     * @return {Promise<Object>} Promise resolving with object with info about the end result
     */


    (0, _createClass3.default)(BookingReferrers, [{
      key: 'enquire',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              start = _ref2.start,
              end = _ref2.end,
              _ref2$autoRetrieve = _ref2.autoRetrieve,
              autoRetrieve = _ref2$autoRetrieve === undefined ? true : _ref2$autoRetrieve,
              _ref2$onProgress = _ref2.onProgress,
              onProgress = _ref2$onProgress === undefined ? null : _ref2$onProgress;

          var jobInfo, job;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'POST',
                    path: this.endpoint,
                    body: {
                      start: start,
                      end: end
                    }
                  });

                case 2:
                  jobInfo = _context.sent;
                  job = { jobInfo: jobInfo, logs: [] };

                  if (!autoRetrieve) {
                    _context.next = 12;
                    break;
                  }

                case 5:
                  _context.next = 7;
                  return wait(AUTO_RETRIEVE_TIMEOUT);

                case 7:
                  _context.next = 9;
                  return this.retrieve({ jobId: (0, _get2.default)(job, 'jobInfo.id') });

                case 9:
                  job = _context.sent;


                  if (onProgress) {
                    onProgress(job);
                  }

                case 11:
                  if (!isFinalState((0, _get2.default)(job, 'jobInfo.state'))) {
                    _context.next = 5;
                    break;
                  }

                case 12:
                  return _context.abrupt('return', job);

                case 13:
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
              jobId = _ref4.jobId;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    method: 'GET',
                    path: this.endpoint + '/' + jobId
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
    return BookingReferrers;
  }(_Resource3.default);

  exports.default = BookingReferrers;


  function isFinalState(state) {
    switch (state) {
      case 'complete':
      case 'failed':
        return true;
      default:
        return false;
    }
  }

  function wait(ms) {
    return new _promise2.default(function (resolve, reject) {
      setTimeout(resolve, ms);
    });
  }
  module.exports = exports['default'];
});