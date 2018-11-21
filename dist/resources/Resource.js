(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/extends', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../utils/requests', 'qs', 'platform', 'lodash/get', 'lodash/includes', 'lodash/isEmpty', '../errors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/extends'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../utils/requests'), require('qs'), require('platform'), require('lodash/get'), require('lodash/includes'), require('lodash/isEmpty'), require('../errors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global._extends, global.asyncToGenerator, global.classCallCheck, global.createClass, global.requests, global.qs, global.platform, global.get, global.includes, global.isEmpty, global.errors);
    global.Resource = mod.exports;
  }
})(this, function (module, exports, _regenerator, _extends2, _asyncToGenerator2, _classCallCheck2, _createClass2, _requests, _qs, _platform, _get2, _includes, _isEmpty, _errors2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _extends3 = _interopRequireDefault(_extends2);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _platform2 = _interopRequireDefault(_platform);

  var _get3 = _interopRequireDefault(_get2);

  var _includes2 = _interopRequireDefault(_includes);

  var _isEmpty2 = _interopRequireDefault(_isEmpty);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Resource = function () {
    function Resource(api) {
      (0, _classCallCheck3.default)(this, Resource);
      this.source = null;

      this.api = api;
    }

    (0, _createClass3.default)(Resource, [{
      key: 'request',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
          var path = _ref2.path,
              _ref2$fields = _ref2.fields,
              fields = _ref2$fields === undefined ? [] : _ref2$fields,
              _ref2$params = _ref2.params,
              params = _ref2$params === undefined ? {} : _ref2$params,
              _ref2$query = _ref2.query,
              query = _ref2$query === undefined ? null : _ref2$query,
              _ref2$method = _ref2.method,
              method = _ref2$method === undefined ? 'GET' : _ref2$method,
              _ref2$mode = _ref2.mode,
              mode = _ref2$mode === undefined ? 'cors' : _ref2$mode,
              _ref2$credentials = _ref2.credentials,
              credentials = _ref2$credentials === undefined ? 'include' : _ref2$credentials,
              _ref2$body = _ref2.body,
              body = _ref2$body === undefined ? null : _ref2$body;

          var options, args, url, pathFixed, postish, shouldEncode, queryStr, _ref3, requestUrl, requestOptions, response;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  method = method.toUpperCase();
                  options = {
                    mode: mode,
                    credentials: credentials,
                    method: method,
                    headers: {},
                    body: null
                  };
                  args = (0, _extends3.default)({
                    __resellerID: this.api.resellerId,
                    __i18n: this.api.language,
                    __fields: fields
                  }, params);
                  url = void 0;
                  pathFixed = ('' + (path || '')).replace(/^\/+|\/+$/, '');


                  if (!(0, _isEmpty2.default)(body)) {
                    options.headers['Content-Type'] = 'application/json';
                    options.body = (0, _requests.phpJsonEncode)(body);
                    options.rawBody = true;
                    args = body;
                    url = this.apiUrl + '/' + pathFixed;
                  } else {
                    postish = (0, _includes2.default)(['POST', 'PUT'], options.method);
                    shouldEncode = postish || _platform2.default.name === 'IE' && parseFloat(_platform2.default.version) < 12;
                    queryStr = postish || query === null ? (0, _requests.formatArgs)(args, shouldEncode) : (0, _requests.formatQuery)(query, shouldEncode);


                    if (postish) {
                      options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                      options.body = queryStr;
                      url = this.apiUrl + '/' + pathFixed;
                    } else {
                      url = this.apiUrl + '/' + pathFixed + '?' + queryStr;
                    }
                  }

                  _context.next = 8;
                  return this.prepareRequest(url, options, args);

                case 8:
                  _ref3 = _context.sent;
                  requestUrl = _ref3.url;
                  requestOptions = _ref3.options;


                  requestOptions.body = requestOptions.body || undefined;
                  _context.next = 14;
                  return fetch(requestUrl, requestOptions);

                case 14:
                  response = _context.sent;
                  return _context.abrupt('return', this.parseResponse(response, requestUrl));

                case 16:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function request(_x) {
          return _ref.apply(this, arguments);
        }

        return request;
      }()
    }, {
      key: 'parseResponse',
      value: function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(response, url) {
          var text, data, _data, dataProp, result, errors, error, _errors, _error, msg;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return response.text();

                case 2:
                  text = _context2.sent;
                  data = void 0;
                  _context2.prev = 4;

                  data = JSON.parse(text);
                  _context2.next = 11;
                  break;

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2['catch'](4);
                  throw new _errors2.InvalidResponseError(text, url);

                case 11:
                  _data = data, dataProp = _data.data, result = _data.result, errors = _data.errors, error = _data.error;

                  if (!dataProp) {
                    _context2.next = 16;
                    break;
                  }

                  return _context2.abrupt('return', dataProp);

                case 16:
                  if (!result) {
                    _context2.next = 28;
                    break;
                  }

                  _errors = result.errors;

                  if (!_errors) {
                    _context2.next = 25;
                    break;
                  }

                  _context2.t1 = _regenerator2.default.keys(_errors);

                case 20:
                  if ((_context2.t2 = _context2.t1()).done) {
                    _context2.next = 25;
                    break;
                  }

                  _error = _context2.t2.value;
                  throw new _errors2.DeskbookersError(_errors[_error] + ' (' + url + ')');

                case 25:
                  return _context2.abrupt('return', result);

                case 28:
                  if (!error) {
                    _context2.next = 33;
                    break;
                  }

                  msg = (data.errorMessage || 'An error occurred') + ' (' + url + ')';
                  throw new _errors2.DeskbookersError(msg);

                case 33:
                  if (errors) {
                    errors.map(function (error) {
                      throw new _errors2.DeskbookersError(error.title + ': ' + error.detail + ' (' + url + ')');
                    });
                  }

                case 34:
                  throw new _errors2.DeskbookersError('Invalid response received (' + url + ')');

                case 35:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[4, 8]]);
        }));

        function parseResponse(_x2, _x3) {
          return _ref4.apply(this, arguments);
        }

        return parseResponse;
      }()
    }, {
      key: 'prepareRequest',
      value: function prepareRequest(url, options, args) {
        // Sign request?
        if (this.api.session) {
          return (0, _requests.signer)(this.api.session, url, options, args);
        } else {
          return { url: url, options: options };
        }
      }
    }, {
      key: 'apiUrl',
      get: function get() {
        var _api = this.api,
            version = _api.version,
            sources = _api.sources;
        var _api2 = this.api,
            host = _api2.host,
            https = _api2.https;

        var path = '/userapi/v' + version;

        // Overwrite settings with source settings when set
        var sourceSettings = (0, _get3.default)(sources, this.source);
        if (sourceSettings) {
          host = (0, _get3.default)(sourceSettings, 'host', host);
          path = ('/' + (0, _get3.default)(sourceSettings, 'path', path)).replace(/\/+$/, '');
          https = (0, _get3.default)(sourceSettings, 'https', https);
        }

        // Build URL
        var protocol = https ? 'https' : 'http';
        return protocol + '://' + host + path;
      }
    }]);
    return Resource;
  }();

  exports.default = Resource;
  module.exports = exports['default'];
});