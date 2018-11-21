(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/json/stringify', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', './Resource', '../errors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/json/stringify'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('./Resource'), require('../errors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.stringify, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.errors);
    global.Seo = mod.exports;
  }
})(this, function (module, exports, _stringify, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _stringify2 = _interopRequireDefault(_stringify);

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

  var Seo = function (_Resource) {
    (0, _inherits3.default)(Seo, _Resource);

    function Seo() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Seo);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Seo.__proto__ || (0, _getPrototypeOf2.default)(Seo)).call.apply(_ref, [this].concat(args))), _this), _this.source = 'seo', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Seo, [{
      key: 'overviewMainCities',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(lang) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.request({
                    method: 'GET',
                    path: '/overview/mainCities/' + lang
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

        function overviewMainCities(_x) {
          return _ref2.apply(this, arguments);
        }

        return overviewMainCities;
      }()
    }, {
      key: 'crumbs',
      value: function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              lang = _ref4.lang,
              type = _ref4.type,
              typeSlug = _ref4.typeSlug,
              cityId = _ref4.cityId,
              citySlug = _ref4.citySlug,
              cityName = _ref4.cityName,
              cityCoordinate = _ref4.cityCoordinate;

          var query;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  query = { lang: lang };


                  // Type
                  if (type && type.length > 0) {
                    query.type = type;
                  } else if (typeSlug && typeSlug.length > 0) {
                    query.typeSlug = typeSlug;
                  }

                  // City
                  if (cityId) {
                    query.id = cityId;
                  } else if (citySlug && citySlug.length > 0) {
                    query.citySlug = citySlug;
                  } else if (cityName && cityName.length > 0 && cityCoordinate) {
                    query.name = cityName;
                    query.coordinate = typeof cityCoordinate === 'string' ? cityCoordinate : (0, _stringify2.default)(cityCoordinate);
                  }

                  _context2.next = 5;
                  return this.request({
                    method: 'GET',
                    path: '/crumbs',
                    query: query
                  });

                case 5:
                  return _context2.abrupt('return', _context2.sent);

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function crumbs() {
          return _ref3.apply(this, arguments);
        }

        return crumbs;
      }()
    }]);
    return Seo;
  }(_Resource3.default);

  exports.default = Seo;
  module.exports = exports['default'];
});