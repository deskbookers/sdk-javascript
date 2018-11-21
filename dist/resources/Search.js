(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/typeof', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', './Resource', '../errors', 'lodash/get', 'lodash/isNil'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/typeof'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('./Resource'), require('../errors'), require('lodash/get'), require('lodash/isNil'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global._typeof, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.errors, global.get, global.isNil);
    global.Search = mod.exports;
  }
})(this, function (module, exports, _regenerator, _typeof2, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _errors, _get, _isNil) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _Resource3 = _interopRequireDefault(_Resource2);

  var _get2 = _interopRequireDefault(_get);

  var _isNil2 = _interopRequireDefault(_isNil);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Search = function (_Resource) {
    (0, _inherits3.default)(Search, _Resource);

    function Search(api) {
      (0, _classCallCheck3.default)(this, Search);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Search.__proto__ || (0, _getPrototypeOf2.default)(Search)).call(this, api));

      _this.source = 'search';
      return _this;
    }

    (0, _createClass3.default)(Search, [{
      key: 'spaces',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(params) {
          var result;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(!params || (typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) !== 'object')) {
                    _context.next = 2;
                    break;
                  }

                  throw new _errors.DeskbookersError('Parameters must be an Object');

                case 2:
                  _context.next = 4;
                  return this.request({
                    method: 'POST',
                    path: '/spaces/search',
                    body: params
                  });

                case 4:
                  result = _context.sent;
                  return _context.abrupt('return', {
                    total: (0, _get2.default)(result, 'hits.total', 0),
                    results: (0, _get2.default)(result, 'hits.hits', []),
                    context: (0, _get2.default)(result, 'context', {}),
                    facets: (0, _get2.default)(result, 'aggregations', {})
                  });

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function spaces(_x) {
          return _ref.apply(this, arguments);
        }

        return spaces;
      }()
    }, {
      key: 'spaceSuggestions',
      value: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              text = _ref3.text,
              context = _ref3.context,
              language = _ref3.language,
              _ref3$resolveBounds = _ref3.resolveBounds,
              resolveBounds = _ref3$resolveBounds === undefined ? false : _ref3$resolveBounds;

          var params;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  params = {
                    q: text || '',
                    resolveBounds: resolveBounds
                  };

                  if (!(0, _isNil2.default)(context)) {
                    params.context = context;
                  }
                  if (!(0, _isNil2.default)(language)) {
                    params.language = language;
                  }

                  _context2.next = 5;
                  return this.request({
                    method: 'GET',
                    path: '/spaces/suggestions',
                    params: params,
                    fields: ["name", "geometry.location", "place_id", "formatted_address"]
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

        function spaceSuggestions() {
          return _ref2.apply(this, arguments);
        }

        return spaceSuggestions;
      }()
    }]);
    return Search;
  }(_Resource3.default);

  exports.default = Search;
  module.exports = exports['default'];
});