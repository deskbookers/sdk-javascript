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
    global.Notifications = mod.exports;
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

  var Notifications = function (_Resource) {
    (0, _inherits3.default)(Notifications, _Resource);

    function Notifications() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Notifications);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Notifications.__proto__ || (0, _getPrototypeOf2.default)(Notifications)).call.apply(_ref, [this].concat(args))), _this), _this.source = 'notifications', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Notifications, [{
      key: 'list',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref3.userId,
              start = _ref3.start,
              limit = _ref3.limit,
              type = _ref3.type,
              unread = _ref3.unread,
              _ref3$noCache = _ref3.noCache,
              noCache = _ref3$noCache === undefined ? false : _ref3$noCache;

          var params;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  params = {
                    userId: userId,
                    start: start,
                    limit: limit,
                    type: type,
                    unread: unread,
                    noCache: noCache
                  };

                  clean(params);
                  _context.next = 4;
                  return this.request({
                    path: 'notifications/' + userId,
                    params: params
                  });

                case 4:
                  return _context.abrupt('return', _context.sent);

                case 5:
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
      key: 'count',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
          var userId = _ref5.userId,
              type = _ref5.type,
              unread = _ref5.unread,
              _ref5$noCache = _ref5.noCache,
              noCache = _ref5$noCache === undefined ? false : _ref5$noCache;
          var params;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  params = {
                    userId: userId,
                    type: type,
                    unread: unread,
                    noCache: noCache
                  };

                  clean(params);
                  _context2.next = 4;
                  return this.request({
                    path: 'notifications/count/' + userId,
                    params: params
                  });

                case 4:
                  return _context2.abrupt('return', _context2.sent);

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function count(_x2) {
          return _ref4.apply(this, arguments);
        }

        return count;
      }()
    }, {
      key: 'create',
      value: function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(notification) {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.request({
                    method: 'POST',
                    path: 'notifications',
                    body: notification
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

        function create(_x3) {
          return _ref6.apply(this, arguments);
        }

        return create;
      }()
    }, {
      key: 'flagAsRead',
      value: function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref8) {
          var userId = _ref8.userId,
              type = _ref8.type,
              id = _ref8.id;
          var body;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  body = {
                    type: type,
                    id: id
                  };

                  clean(body);
                  _context4.next = 4;
                  return this.request({
                    method: 'PUT',
                    path: 'notifications/' + userId,
                    body: body
                  });

                case 4:
                  return _context4.abrupt('return', _context4.sent);

                case 5:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function flagAsRead(_x4) {
          return _ref7.apply(this, arguments);
        }

        return flagAsRead;
      }()
    }, {
      key: 'delete',
      value: function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.request({
                    method: 'DELETE',
                    path: 'notifications'
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

        function _delete() {
          return _ref9.apply(this, arguments);
        }

        return _delete;
      }()
    }]);
    return Notifications;
  }(_Resource3.default);

  exports.default = Notifications;


  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  module.exports = exports['default'];
});