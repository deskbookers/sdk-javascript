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
    global.Users = mod.exports;
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

  var Users = function (_Resource) {
    (0, _inherits3.default)(Users, _Resource);

    function Users(api) {
      (0, _classCallCheck3.default)(this, Users);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Users.__proto__ || (0, _getPrototypeOf2.default)(Users)).call(this, api));

      _this.source = 'payments';

      _this.endpoint = 'users';
      return _this;
    }

    /**
     * Get user
     *
     * @param {int} userId - User Id.
     * @return {Object[]} - subscriptions.
     */


    (0, _createClass3.default)(Users, [{
      key: 'get',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref2.userId;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    path: this.endpoint + '/' + userId
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

        function get() {
          return _ref.apply(this, arguments);
        }

        return get;
      }()
    }, {
      key: 'subscriptions',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref4.userId,
              limit = _ref4.limit,
              lastId = _ref4.lastId,
              status = _ref4.status;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    path: this.endpoint + '/' + userId + '/subscriptions',
                    params: {
                      limit: limit,
                      lastId: lastId,
                      status: status
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

        function subscriptions() {
          return _ref3.apply(this, arguments);
        }

        return subscriptions;
      }()
    }, {
      key: 'invoices',
      value: function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref6.userId,
              limit = _ref6.limit,
              lastId = _ref6.lastId;

          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.request({
                    path: this.endpoint + '/' + userId + '/invoices',
                    params: {
                      limit: limit,
                      lastId: lastId
                    }
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

        function invoices() {
          return _ref5.apply(this, arguments);
        }

        return invoices;
      }()
    }, {
      key: 'payments',
      value: function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
          var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref8.userId,
              limit = _ref8.limit,
              lastId = _ref8.lastId;

          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.request({
                    path: this.endpoint + '/' + userId + '/payments',
                    params: {
                      limit: limit,
                      lastId: lastId
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

        function payments() {
          return _ref7.apply(this, arguments);
        }

        return payments;
      }()
    }, {
      key: 'upsert',
      value: function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
          var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref10.userId,
              user = _ref10.user;

          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.request({
                    method: 'PUT',
                    path: this.endpoint + '/' + userId,
                    body: user
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

        function upsert() {
          return _ref9.apply(this, arguments);
        }

        return upsert;
      }()
    }, {
      key: 'createSource',
      value: function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
          var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref12.userId,
              token = _ref12.token,
              email = _ref12.email,
              setDefault = _ref12.setDefault;

          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.request({
                    method: 'POST',
                    path: this.endpoint + '/' + userId + '/sources',
                    body: {
                      token: token, email: email, setDefault: setDefault
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

        function createSource() {
          return _ref11.apply(this, arguments);
        }

        return createSource;
      }()
    }, {
      key: 'listSources',
      value: function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
          var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref14.userId,
              limit = _ref14.limit,
              lastId = _ref14.lastId;

          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.request({
                    path: this.endpoint + '/' + userId + '/sources',
                    params: {
                      limit: limit,
                      lastId: lastId
                    }
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

        function listSources() {
          return _ref13.apply(this, arguments);
        }

        return listSources;
      }()
    }, {
      key: 'deleteSource',
      value: function () {
        var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
          var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref16.userId,
              sourceId = _ref16.sourceId;

          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this.request({
                    method: 'DELETE',
                    path: this.endpoint + '/' + userId + '/sources/' + sourceId
                  });

                case 2:
                  return _context8.abrupt('return', _context8.sent);

                case 3:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function deleteSource() {
          return _ref15.apply(this, arguments);
        }

        return deleteSource;
      }()
    }, {
      key: 'setDefaultSource',
      value: function () {
        var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
          var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref18.userId,
              sourceId = _ref18.sourceId;

          return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this.request({
                    method: 'PUT',
                    path: this.endpoint + '/' + userId + '/defaultsource/' + sourceId,
                    body: { sourceId: sourceId }
                  });

                case 2:
                  return _context9.abrupt('return', _context9.sent);

                case 3:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function setDefaultSource() {
          return _ref17.apply(this, arguments);
        }

        return setDefaultSource;
      }()
    }, {
      key: 'createCharge',
      value: function () {
        var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
          var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              userId = _ref20.userId,
              charge = _ref20.charge;

          return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return this.request({
                    method: 'POST',
                    path: this.endpoint + '/' + userId + '/charge',
                    body: charge
                  });

                case 2:
                  return _context10.abrupt('return', _context10.sent);

                case 3:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, this);
        }));

        function createCharge() {
          return _ref19.apply(this, arguments);
        }

        return createCharge;
      }()
    }]);
    return Users;
  }(_Resource3.default);

  exports.default = Users;
  module.exports = exports['default'];
});