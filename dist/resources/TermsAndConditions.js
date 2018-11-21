(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', './Resource', '../errors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('./Resource'), require('../errors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.errors);
    global.TermsAndConditions = mod.exports;
  }
})(this, function (module, exports, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _errors) {
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

  var TermsAndConditions = function (_Resource) {
    (0, _inherits3.default)(TermsAndConditions, _Resource);

    function TermsAndConditions(api) {
      (0, _classCallCheck3.default)(this, TermsAndConditions);

      var _this = (0, _possibleConstructorReturn3.default)(this, (TermsAndConditions.__proto__ || (0, _getPrototypeOf2.default)(TermsAndConditions)).call(this, api));

      _this.endpoint = 'tc';
      return _this;
    }

    (0, _createClass3.default)(TermsAndConditions, [{
      key: 'listActive',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/active',
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

        function listActive() {
          return _ref.apply(this, arguments);
        }

        return listActive;
      }()
    }, {
      key: 'userPending',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(userId) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/userPending',
                    params: { userId: userId }
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

        function userPending(_x) {
          return _ref2.apply(this, arguments);
        }

        return userPending;
      }()
    }, {
      key: 'userAccepted',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(userId) {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/userAccepted',
                    params: { userId: userId }
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

        function userAccepted(_x2) {
          return _ref3.apply(this, arguments);
        }

        return userAccepted;
      }()
    }, {
      key: 'userAccept',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref5) {
          var userId = _ref5.userId,
              tcId = _ref5.tcId;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.request({
                    method: 'POST',
                    path: '/' + this.endpoint + '/userAccept',
                    params: {
                      userId: userId,
                      tcId: tcId
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

        function userAccept(_x3) {
          return _ref4.apply(this, arguments);
        }

        return userAccept;
      }()
    }, {
      key: 'venuePending',
      value: function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(venueId) {
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/venuePending',
                    params: { venueId: venueId }
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

        function venuePending(_x4) {
          return _ref6.apply(this, arguments);
        }

        return venuePending;
      }()
    }, {
      key: 'venueAccepted',
      value: function () {
        var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(venueId) {
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/venueAccepted',
                    params: { venueId: venueId }
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

        function venueAccepted(_x5) {
          return _ref7.apply(this, arguments);
        }

        return venueAccepted;
      }()
    }, {
      key: 'venueAccept',
      value: function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(_ref9) {
          var venueId = _ref9.venueId,
              tcId = _ref9.tcId;
          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.request({
                    method: 'POST',
                    path: '/' + this.endpoint + '/venueAccept',
                    params: {
                      venueId: venueId,
                      tcId: tcId
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

        function venueAccept(_x6) {
          return _ref8.apply(this, arguments);
        }

        return venueAccept;
      }()
    }, {
      key: 'emailSettings',
      value: function () {
        var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(userId) {
          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/' + this.endpoint + '/emailSettings',
                    params: { userId: userId }
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

        function emailSettings(_x7) {
          return _ref10.apply(this, arguments);
        }

        return emailSettings;
      }()
    }, {
      key: 'saveEmailSettings',
      value: function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(_ref12) {
          var userId = _ref12.userId,
              emails = _ref12.emails;
          return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this.request({
                    method: 'POST',
                    path: '/' + this.endpoint + '/emailSettings',
                    params: { userId: userId, emails: emails }
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

        function saveEmailSettings(_x8) {
          return _ref11.apply(this, arguments);
        }

        return saveEmailSettings;
      }()
    }]);
    return TermsAndConditions;
  }(_Resource3.default);

  exports.default = TermsAndConditions;
  module.exports = exports['default'];
});