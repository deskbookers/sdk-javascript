(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/helpers/objectWithoutProperties', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../Resource', './Preferences', 'bcryptjs'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/objectWithoutProperties'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../Resource'), require('./Preferences'), require('bcryptjs'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.objectWithoutProperties, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.Preferences, global.bcryptjs);
    global.index = mod.exports;
  }
})(this, function (module, exports, _objectWithoutProperties2, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _Preferences, _bcryptjs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _Resource3 = _interopRequireDefault(_Resource2);

  var _Preferences2 = _interopRequireDefault(_Preferences);

  var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Account = function (_Resource) {
    (0, _inherits3.default)(Account, _Resource);

    function Account(api) {
      (0, _classCallCheck3.default)(this, Account);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Account.__proto__ || (0, _getPrototypeOf2.default)(Account)).call(this, api));

      // Create sub-resources
      _this.preferences = new _Preferences2.default(api);
      return _this;
    }

    (0, _createClass3.default)(Account, [{
      key: 'retrieveSalt',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(email) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'GET',
                    path: email ? 'prepareLogin' : 'prepareRegister',
                    params: email ? { email: email } : {}
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

        function retrieveSalt(_x) {
          return _ref.apply(this, arguments);
        }

        return retrieveSalt;
      }()
    }, {
      key: 'validateCredentials',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(email, passwordHash) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'login',
                    params: {
                      email: email,
                      password: passwordHash
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

        function validateCredentials(_x2, _x3) {
          return _ref2.apply(this, arguments);
        }

        return validateCredentials;
      }()
    }, {
      key: 'login',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(email) {
          var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var backoffice = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var salt, hash, result;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.retrieveSalt(email);

                case 2:
                  _context3.t0 = _context3.sent;

                  if (_context3.t0) {
                    _context3.next = 5;
                    break;
                  }

                  _context3.t0 = '';

                case 5:
                  salt = _context3.t0;
                  _context3.next = 8;
                  return _bcryptjs2.default.hash(password, salt);

                case 8:
                  hash = _context3.sent;
                  _context3.next = 11;
                  return this.validateCredentials(email, hash);

                case 11:
                  result = _context3.sent;


                  // Set session on parent class
                  this.api.session = {
                    privateKey: result.privateKey,
                    publicKey: result.publicKey,
                    user: result.user
                  };

                  if (!backoffice) {
                    _context3.next = 16;
                    break;
                  }

                  _context3.next = 16;
                  return this.backofficeLogin();

                case 16:
                  _context3.next = 18;
                  return this.retrieve();

                case 18:
                  return _context3.abrupt('return', _context3.sent);

                case 19:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function login(_x4) {
          return _ref3.apply(this, arguments);
        }

        return login;
      }()
    }, {
      key: 'backofficeLogin',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.request({
                    method: 'POST',
                    path: 'backoffice/login'
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

        function backofficeLogin() {
          return _ref4.apply(this, arguments);
        }

        return backofficeLogin;
      }()
    }, {
      key: 'forgot',
      value: function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(email) {
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'forgot-password',
                    params: {
                      email: email
                    }
                  });

                case 2:
                  return _context5.abrupt('return', true);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function forgot(_x7) {
          return _ref5.apply(this, arguments);
        }

        return forgot;
      }()
    }, {
      key: 'signup',
      value: function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref7) {
          var suppliedFirstName = _ref7.firstName,
              suppliedLastName = _ref7.lastName,
              suppliedEmail = _ref7.email,
              _ref7$password = _ref7.password,
              suppliedPassword = _ref7$password === undefined ? '' : _ref7$password,
              _ref7$backoffice = _ref7.backoffice,
              backoffice = _ref7$backoffice === undefined ? false : _ref7$backoffice;
          var salt, hash, result;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.retrieveSalt();

                case 2:
                  _context6.t0 = _context6.sent;

                  if (_context6.t0) {
                    _context6.next = 5;
                    break;
                  }

                  _context6.t0 = '';

                case 5:
                  salt = _context6.t0;
                  _context6.next = 8;
                  return _bcryptjs2.default.hash(suppliedPassword, salt);

                case 8:
                  hash = _context6.sent;
                  _context6.next = 11;
                  return this.request({
                    method: 'GET',
                    path: 'register',
                    params: {
                      firstName: suppliedFirstName,
                      lastName: suppliedLastName,
                      email: suppliedEmail,
                      password: hash
                    }
                  });

                case 11:
                  result = _context6.sent;


                  // Set session on parent class
                  this.api.session = {
                    privateKey: result.privateKey,
                    publicKey: result.publicKey,
                    user: result.user
                  };

                  if (!backoffice) {
                    _context6.next = 16;
                    break;
                  }

                  _context6.next = 16;
                  return this.backofficeLogin();

                case 16:
                  _context6.next = 18;
                  return this.retrieve();

                case 18:
                  return _context6.abrupt('return', _context6.sent);

                case 19:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function signup(_x8) {
          return _ref6.apply(this, arguments);
        }

        return signup;
      }()
    }, {
      key: 'logout',
      value: function () {
        var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
          return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.request({
                    method: 'POST',
                    path: 'logout'
                  });

                case 2:
                  this.api.session = null;
                  return _context7.abrupt('return', true);

                case 4:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function logout() {
          return _ref8.apply(this, arguments);
        }

        return logout;
      }()
    }, {
      key: 'retrieve',
      value: function () {
        var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
          var _ref10, id, email, firstName, lastName, fullName, country, organisations, timezone, language, balance, createdAt, others;

          return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'user'
                  });

                case 2:
                  _ref10 = _context8.sent;
                  id = _ref10.id;
                  email = _ref10.email;
                  firstName = _ref10.firstName;
                  lastName = _ref10.lastName;
                  fullName = _ref10.name_without_title;
                  country = _ref10.country;
                  organisations = _ref10.organisations;
                  timezone = _ref10.timezone;
                  language = _ref10.lang;
                  balance = _ref10.balance;
                  createdAt = _ref10.created;
                  others = (0, _objectWithoutProperties3.default)(_ref10, ['id', 'email', 'firstName', 'lastName', 'name_without_title', 'country', 'organisations', 'timezone', 'lang', 'balance', 'created']);
                  return _context8.abrupt('return', {
                    id: id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    fullName: fullName,
                    country: country,
                    organisations: organisations,
                    timezone: timezone,
                    language: language,
                    balance: balance,
                    createdAt: new Date(parseInt(createdAt) * 1e3),
                    isSuper: others.super
                  });

                case 16:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function retrieve() {
          return _ref9.apply(this, arguments);
        }

        return retrieve;
      }()
    }, {
      key: 'setLanguage',
      value: function () {
        var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(language) {
          return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this.request({
                    method: 'POST',
                    path: 'user/language',
                    params: {
                      lang: language
                    }
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

        function setLanguage(_x9) {
          return _ref11.apply(this, arguments);
        }

        return setLanguage;
      }()
    }, {
      key: 'setTimezone',
      value: function () {
        var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(timezone) {
          return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return this.request({
                    method: 'POST',
                    path: 'user/timezone',
                    params: {
                      timezone: timezone
                    }
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

        function setTimezone(_x10) {
          return _ref12.apply(this, arguments);
        }

        return setTimezone;
      }()
    }, {
      key: 'contexts',
      value: function () {
        var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
          var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              params = (0, _objectWithoutProperties3.default)(_ref14, []);

          return _regenerator2.default.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'user/contexts',
                    params: params
                  });

                case 2:
                  return _context11.abrupt('return', _context11.sent);

                case 3:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, this);
        }));

        function contexts() {
          return _ref13.apply(this, arguments);
        }

        return contexts;
      }()
    }, {
      key: 'menu',
      value: function () {
        var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(context) {
          return _regenerator2.default.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return this.request({
                    path: 'user/menu/' + context
                  });

                case 2:
                  return _context12.abrupt('return', _context12.sent);

                case 3:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, this);
        }));

        function menu(_x12) {
          return _ref15.apply(this, arguments);
        }

        return menu;
      }()
    }, {
      key: 'groups',
      value: function () {
        var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
          return _regenerator2.default.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return this.request({
                    path: 'user/groups'
                  });

                case 2:
                  return _context13.abrupt('return', _context13.sent);

                case 3:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, this);
        }));

        function groups() {
          return _ref16.apply(this, arguments);
        }

        return groups;
      }()
    }, {
      key: 'toggleFavorite',
      value: function () {
        var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(spaceId, favorite) {
          var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          return _regenerator2.default.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  if (!favorite) {
                    _context14.next = 6;
                    break;
                  }

                  _context14.next = 3;
                  return this.request({
                    method: 'POST',
                    path: 'user/favorite',
                    params: {
                      workplaceId: spaceId,
                      auto: auto
                    }
                  });

                case 3:
                  return _context14.abrupt('return', _context14.sent);

                case 6:
                  _context14.next = 8;
                  return this.request({
                    method: 'POST',
                    path: 'user/unfavorite',
                    params: {
                      workplaceId: spaceId
                    }
                  });

                case 8:
                  return _context14.abrupt('return', _context14.sent);

                case 9:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, this);
        }));

        function toggleFavorite(_x13, _x14) {
          return _ref17.apply(this, arguments);
        }

        return toggleFavorite;
      }()
    }, {
      key: 'favorites',
      value: function () {
        var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
          return _regenerator2.default.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return this.request({
                    method: 'GET',
                    path: 'user/favorites'
                  });

                case 2:
                  return _context15.abrupt('return', _context15.sent);

                case 3:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, this);
        }));

        function favorites() {
          return _ref18.apply(this, arguments);
        }

        return favorites;
      }()
    }]);
    return Account;
  }(_Resource3.default);

  exports.default = Account;
  module.exports = exports['default'];
});