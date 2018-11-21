(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'babel-runtime/core-js/map', '../Resource', 'ramda/src/pickAll'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('babel-runtime/core-js/map'), require('../Resource'), require('ramda/src/pickAll'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.map, global.Resource, global.pickAll);
    global.Preferences = mod.exports;
  }
})(this, function (module, exports, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _map, _Resource2, _pickAll) {
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

  var _map2 = _interopRequireDefault(_map);

  var _Resource3 = _interopRequireDefault(_Resource2);

  var _pickAll2 = _interopRequireDefault(_pickAll);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Construct Map from object
  var constructMap = function constructMap(o) {
    var map = new _map2.default();

    for (var key in o) {
      map.set(key, o[key]);
    }

    return map;
  };

  // Convert response array to object
  var parseResponse = function parseResponse(res) {
    return res.reduce(function (o, pref) {
      o[pref.key] = pref.value;
      return o;
    }, {});
  };

  var Preferences = function (_Resource) {
    (0, _inherits3.default)(Preferences, _Resource);

    function Preferences(api) {
      (0, _classCallCheck3.default)(this, Preferences);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Preferences.__proto__ || (0, _getPrototypeOf2.default)(Preferences)).call(this, api));

      _this.endpoint = 'user/preferences';
      return _this;
    }

    (0, _createClass3.default)(Preferences, [{
      key: 'getCurrentPreferences',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var res;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'GET',
                    path: this.endpoint
                  });

                case 2:
                  res = _context.sent;
                  return _context.abrupt('return', parseResponse(res));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getCurrentPreferences() {
          return _ref.apply(this, arguments);
        }

        return getCurrentPreferences;
      }()
    }, {
      key: 'retrieve',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(key) {
          var prefs;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.list([key]);

                case 2:
                  prefs = _context2.sent;
                  return _context2.abrupt('return', prefs.get(key) || null);

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function retrieve(_x) {
          return _ref2.apply(this, arguments);
        }

        return retrieve;
      }()
    }, {
      key: 'list',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
          }

          var current, prefs;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.getCurrentPreferences();

                case 2:
                  current = _context3.sent;
                  prefs = keys.length ? (0, _pickAll2.default)(keys, current) : current;
                  return _context3.abrupt('return', constructMap(prefs));

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function list() {
          return _ref3.apply(this, arguments);
        }

        return list;
      }()
    }, {
      key: 'update',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
          var preferences = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var prefs, key, res;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.getCurrentPreferences();

                case 2:
                  prefs = _context4.sent;


                  for (key in preferences) {
                    prefs[key] = preferences[key];
                  }

                  _context4.next = 6;
                  return this.request({
                    method: 'POST',
                    path: this.endpoint,
                    params: {
                      preferences: prefs
                    }
                  });

                case 6:
                  res = _context4.sent;
                  return _context4.abrupt('return', constructMap(parseResponse(res)));

                case 8:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function update() {
          return _ref4.apply(this, arguments);
        }

        return update;
      }()
    }]);
    return Preferences;
  }(_Resource3.default);

  exports.default = Preferences;
  module.exports = exports['default'];
});