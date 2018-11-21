(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/helpers/asyncGenerator', 'babel-runtime/helpers/asyncIterator', 'babel-runtime/helpers/asyncGeneratorDelegate', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', './Resource', '../errors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/asyncGenerator'), require('babel-runtime/helpers/asyncIterator'), require('babel-runtime/helpers/asyncGeneratorDelegate'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('./Resource'), require('../errors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.asyncGenerator, global.asyncIterator, global.asyncGeneratorDelegate, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.errors);
    global.Events = mod.exports;
  }
})(this, function (module, exports, _asyncGenerator2, _asyncIterator2, _asyncGeneratorDelegate2, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

  var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

  var _asyncGeneratorDelegate3 = _interopRequireDefault(_asyncGeneratorDelegate2);

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

  var Events = function (_Resource) {
    (0, _inherits3.default)(Events, _Resource);

    function Events(api) {
      (0, _classCallCheck3.default)(this, Events);
      return (0, _possibleConstructorReturn3.default)(this, (Events.__proto__ || (0, _getPrototypeOf2.default)(Events)).call(this, api));
    }

    (0, _createClass3.default)(Events, [{
      key: 'unread',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'event/unreadCounts'
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

        function unread() {
          return _ref.apply(this, arguments);
        }

        return unread;
      }()
    }, {
      key: 'retrieve',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var tabId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
          var events, startId;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (tabId) {
                    _context2.next = 2;
                    break;
                  }

                  throw new _errors.DeskbookersError('No tab id');

                case 2:
                  _context2.next = 4;
                  return this.request({
                    method: 'GET',
                    path: 'event/' + parseInt(tabId)
                  });

                case 4:
                  events = _context2.sent;

                  if (events.length) {
                    _context2.next = 7;
                    break;
                  }

                  throw new _errors.DeskbookersError('No events');

                case 7:
                  startId = events[0].event_id;
                  return _context2.abrupt('return', this.iterateEvents(tabId, startId, limit, 0));

                case 9:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function retrieve() {
          return _ref2.apply(this, arguments);
        }

        return retrieve;
      }()
    }, {
      key: 'iterateEvents',
      value: function () {
        var _ref3 = _asyncGenerator3.default.wrap(_regenerator2.default.mark(function _callee3(tabId, startId, limit, offset) {
          var events;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _asyncGenerator3.default.await(this.getEvents(tabId, startId, limit, offset));

                case 2:
                  events = _context3.sent;
                  _context3.next = 5;
                  return events;

                case 5:
                  if (events.length) {
                    _context3.next = 9;
                    break;
                  }

                  return _context3.abrupt('return', events);

                case 9:
                  return _context3.delegateYield((0, _asyncGeneratorDelegate3.default)((0, _asyncIterator3.default)(this.iterateEvents(tabId, startId, limit, offset + offset)), _asyncGenerator3.default.await), 't0', 10);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function iterateEvents(_x3, _x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
        }

        return iterateEvents;
      }()
    }, {
      key: 'list',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(limit, offset) {
          var tags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'event',
                    params: {
                      limit: limit,
                      offset: offset,
                      tags: tags
                    }
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

        function list(_x7, _x8) {
          return _ref4.apply(this, arguments);
        }

        return list;
      }()
    }, {
      key: 'markAllAsRead',
      value: function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
          var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.request({
                    method: 'POST',
                    path: 'event/read',
                    params: {
                      tags: tags
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

        function markAllAsRead() {
          return _ref5.apply(this, arguments);
        }

        return markAllAsRead;
      }()
    }, {
      key: 'getEvents',
      value: function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(tabId, startId, limit, offset) {
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'event/' + parseInt(tabId),
                    params: {
                      startId: startId,
                      limit: limit,
                      offset: offset
                    }
                  });

                case 2:
                  return _context6.abrupt('return', _context6.sent);

                case 3:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function getEvents(_x11, _x12, _x13, _x14) {
          return _ref6.apply(this, arguments);
        }

        return getEvents;
      }()
    }]);
    return Events;
  }(_Resource3.default);

  exports.default = Events;
  module.exports = exports['default'];
});