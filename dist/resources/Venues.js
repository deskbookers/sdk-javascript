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
    global.Venues = mod.exports;
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

  var Venues = function (_Resource) {
    (0, _inherits3.default)(Venues, _Resource);

    function Venues(api) {
      (0, _classCallCheck3.default)(this, Venues);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Venues.__proto__ || (0, _getPrototypeOf2.default)(Venues)).call(this, api));

      _this.endpoint = 'location';
      return _this;
    }

    /**
     * List payment settings by venue
     *
     * @param {int} venueId - Venue Id body.
     * @return {Object}
     */


    (0, _createClass3.default)(Venues, [{
      key: 'getPaymentSettings',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(venueId) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', this.request({
                    method: 'GET',
                    path: 'location/' + venueId + '/payment-settings'
                  }));

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getPaymentSettings(_x) {
          return _ref.apply(this, arguments);
        }

        return getPaymentSettings;
      }()
    }, {
      key: 'savePaymentSettings',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(venueId, paymentSettings) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', this.request({
                    method: 'POST',
                    path: 'location/' + venueId + '/payment-settings',
                    params: {
                      data: paymentSettings
                    }
                  }));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function savePaymentSettings(_x2, _x3) {
          return _ref2.apply(this, arguments);
        }

        return savePaymentSettings;
      }()
    }, {
      key: 'retrieve',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(venueId) {
          var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              _ref4$fields = _ref4.fields,
              fields = _ref4$fields === undefined ? [] : _ref4$fields,
              _ref4$params = _ref4.params,
              params = _ref4$params === undefined ? {} : _ref4$params;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/' + venueId,
                    fields: fields,
                    params: params
                  });

                case 2:
                  return _context3.abrupt('return', _context3.sent);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function retrieve(_x4) {
          return _ref3.apply(this, arguments);
        }

        return retrieve;
      }()
    }]);
    return Venues;
  }(_Resource3.default);

  exports.default = Venues;
  module.exports = exports['default'];
});