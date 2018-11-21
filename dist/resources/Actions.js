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
    global.Actions = mod.exports;
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

  var Actions = function (_Resource) {
    (0, _inherits3.default)(Actions, _Resource);

    function Actions() {
      (0, _classCallCheck3.default)(this, Actions);
      return (0, _possibleConstructorReturn3.default)(this, (Actions.__proto__ || (0, _getPrototypeOf2.default)(Actions)).apply(this, arguments));
    }

    (0, _createClass3.default)(Actions, [{
      key: 'reportToSales',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(params) {
          var context, _params$extras, extras;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  context = params.context, _params$extras = params.extras, extras = _params$extras === undefined ? [] : _params$extras;
                  _context.next = 3;
                  return this.request({
                    method: 'POST',
                    path: 'report_sales',
                    params: {
                      context: context,
                      extras: extras
                    }
                  });

                case 3:
                  return _context.abrupt('return', _context.sent);

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function reportToSales(_x) {
          return _ref.apply(this, arguments);
        }

        return reportToSales;
      }()
    }, {
      key: 'report',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(params) {
          var message, category, browser, page, context, _params$extras2, extras;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  message = params.message, category = params.category, browser = params.browser, page = params.page, context = params.context, _params$extras2 = params.extras, extras = _params$extras2 === undefined ? [] : _params$extras2;
                  _context2.next = 3;
                  return this.request({
                    method: 'POST',
                    path: 'report',
                    params: {
                      message: message,
                      category: category,
                      browser: browser,
                      page: encodeURIComponent(page),
                      context: context,
                      extras: extras
                    }
                  });

                case 3:
                  return _context2.abrupt('return', _context2.sent);

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function report(_x2) {
          return _ref2.apply(this, arguments);
        }

        return report;
      }()
    }]);
    return Actions;
  }(_Resource3.default);

  exports.default = Actions;
  module.exports = exports['default'];
});