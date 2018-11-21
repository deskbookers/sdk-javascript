(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/helpers/typeof', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', './Resource', '../errors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/typeof'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('./Resource'), require('../errors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global._typeof, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.errors);
    global.Spaces = mod.exports;
  }
})(this, function (module, exports, _typeof2, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof3 = _interopRequireDefault(_typeof2);

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

  var Spaces = function (_Resource) {
    (0, _inherits3.default)(Spaces, _Resource);

    function Spaces(api) {
      (0, _classCallCheck3.default)(this, Spaces);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Spaces.__proto__ || (0, _getPrototypeOf2.default)(Spaces)).call(this, api));

      _this.endpoint = 'workplace';
      return _this;
    }

    (0, _createClass3.default)(Spaces, [{
      key: 'retrieve',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(spaceId) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/' + spaceId,
                    fields: []
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
          return _ref.apply(this, arguments);
        }

        return retrieve;
      }()
    }, {
      key: 'list',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(params) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/search/results',
                    fields: []
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

        function list(_x2) {
          return _ref2.apply(this, arguments);
        }

        return list;
      }()
    }, {
      key: 'urgency',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(spaceId, params) {
          var isArray;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  isArray = Array.isArray(params);

                  if (!(!isArray && (typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) === 'object')) {
                    _context3.next = 5;
                    break;
                  }

                  params = [params];
                  _context3.next = 7;
                  break;

                case 5:
                  if (isArray) {
                    _context3.next = 7;
                    break;
                  }

                  throw new _errors.DeskbookersError('Parameters must be an Object or Array');

                case 7:
                  _context3.next = 9;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/' + spaceId + '/urgency',
                    params: { params: params }
                  });

                case 9:
                  return _context3.abrupt('return', _context3.sent);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function urgency(_x3, _x4) {
          return _ref3.apply(this, arguments);
        }

        return urgency;
      }()
    }, {
      key: 'search',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(params) {
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.api.search.spaces(params);

                case 2:
                  return _context4.abrupt('return', _context4.sent);

                case 3:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function search(_x5) {
          return _ref4.apply(this, arguments);
        }

        return search;
      }()
    }, {
      key: 'suggestions',
      value: function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(params) {
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.api.search.spaceSuggestions(params);

                case 2:
                  return _context5.abrupt('return', _context5.sent);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function suggestions(_x6) {
          return _ref5.apply(this, arguments);
        }

        return suggestions;
      }()
    }]);
    return Spaces;
  }(_Resource3.default);

  exports.default = Spaces;
  module.exports = exports['default'];
});