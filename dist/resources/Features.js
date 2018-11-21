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
    global.Features = mod.exports;
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

  var Features = function (_Resource) {
    (0, _inherits3.default)(Features, _Resource);

    function Features() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Features);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Features.__proto__ || (0, _getPrototypeOf2.default)(Features)).call.apply(_ref, [this].concat(args))), _this), _this.source = 'features', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Features, [{
      key: 'list',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref3$type = _ref3.type,
              type = _ref3$type === undefined ? '' : _ref3$type,
              _ref3$noCache = _ref3.noCache,
              noCache = _ref3$noCache === undefined ? false : _ref3$noCache,
              _ref3$country = _ref3.country,
              country = _ref3$country === undefined ? '' : _ref3$country;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    path: 'features/' + type,
                    params: {
                      noCache: noCache,
                      country: country
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

        function list() {
          return _ref2.apply(this, arguments);
        }

        return list;
      }()
    }, {
      key: 'create',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(feature) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    method: 'POST',
                    path: 'features',
                    body: feature
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

        function create(_x2) {
          return _ref4.apply(this, arguments);
        }

        return create;
      }()
    }, {
      key: 'update',
      value: function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(featureName, feature) {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.request({
                    method: 'PUT',
                    path: 'features/' + featureName,
                    body: feature
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

        function update(_x3, _x4) {
          return _ref5.apply(this, arguments);
        }

        return update;
      }()
    }, {
      key: 'delete',
      value: function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(featureName) {
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.request({
                    method: 'DELETE',
                    path: 'features/' + featureName
                  });

                case 2:
                  return _context4.abrupt('return', _context4.sent);

                case 3:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function _delete(_x5) {
          return _ref6.apply(this, arguments);
        }

        return _delete;
      }()
    }, {
      key: 'listByVenue',
      value: function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(venueId) {
          var noCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.request({
                    path: 'venues/' + venueId + '/features',
                    params: {
                      noCache: noCache
                    }
                  });

                case 2:
                  return _context5.abrupt('return', _context5.sent);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function listByVenue(_x6) {
          return _ref7.apply(this, arguments);
        }

        return listByVenue;
      }()
    }, {
      key: 'checkFeatureByVenue',
      value: function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(venueId, featureName) {
          var noCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var result;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.request({
                    path: 'venues/' + venueId + '/features/' + featureName,
                    params: {
                      noCache: noCache
                    }
                  });

                case 2:
                  result = _context6.sent;
                  return _context6.abrupt('return', result.enabled);

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function checkFeatureByVenue(_x8, _x9) {
          return _ref8.apply(this, arguments);
        }

        return checkFeatureByVenue;
      }()
    }, {
      key: 'updateFeatureByVenue',
      value: function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(venueId, featureName, feature) {
          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.request({
                    method: 'PUT',
                    path: 'venues/' + venueId + '/features/' + featureName,
                    body: feature
                  });

                case 2:
                  return _context7.abrupt('return', _context7.sent);

                case 3:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function updateFeatureByVenue(_x11, _x12, _x13) {
          return _ref9.apply(this, arguments);
        }

        return updateFeatureByVenue;
      }()
    }]);
    return Features;
  }(_Resource3.default);

  exports.default = Features;
  module.exports = exports['default'];
});