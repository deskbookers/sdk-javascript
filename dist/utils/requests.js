(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/extends', 'hash.js', 'url', 'qs', 'json_encode', 'deskbookers-phpurlencode', 'lodash/includes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/extends'), require('hash.js'), require('url'), require('qs'), require('json_encode'), require('deskbookers-phpurlencode'), require('lodash/includes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.hash, global.url, global.qs, global.json_encode, global.deskbookersPhpurlencode, global.includes);
    global.requests = mod.exports;
  }
})(this, function (exports, _extends2, _hash, _url, _qs, _json_encode, _deskbookersPhpurlencode, _includes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.phpUrlEncode = exports.onlyAmpEncode = exports.phpJsonEncode = exports.buildCheckData = exports.signData = exports.formatArgs = exports.formatQuery = exports.jsonifyArgs = exports.signer = undefined;

  var _extends3 = _interopRequireDefault(_extends2);

  var _json_encode2 = _interopRequireDefault(_json_encode);

  var _deskbookersPhpurlencode2 = _interopRequireDefault(_deskbookersPhpurlencode);

  var _includes2 = _interopRequireDefault(_includes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var signer = exports.signer = function signer(_ref, url, options, args) {
    var publicKey = _ref.publicKey,
        privateKey = _ref.privateKey;

    // Prepare vars
    var timestamp = Math.round(new Date().getTime() / 1000);

    // Sign data
    var checkData = buildCheckData(url, options, args, timestamp);
    var hash = signData(checkData, privateKey);

    // Add headers
    return {
      url: url,
      options: (0, _extends3.default)({}, options, {
        headers: (0, _extends3.default)({}, options.headers, {
          Timestamp: timestamp,
          Authenticate: publicKey + ':' + hash
        })
      })
    };
  };

  var jsonifyArgs = exports.jsonifyArgs = function jsonifyArgs(args) {
    var formatted = (0, _extends3.default)({}, args);
    for (var key in formatted) {
      formatted[key] = phpJsonEncode(formatted[key]);
    }return formatted;
  };

  var formatQuery = exports.formatQuery = function formatQuery(query, encode) {
    return (0, _qs.stringify)(query, { encoder: encode ? phpUrlEncode : onlyAmpEncode });
  };

  var formatArgs = exports.formatArgs = function formatArgs(args, encode) {
    return formatQuery(jsonifyArgs(args), encode);
  };

  var signData = exports.signData = function signData(data, privateKey) {
    return (0, _hash.hmac)(_hash.sha512, privateKey).update(data).digest('hex');
  };

  var buildCheckData = exports.buildCheckData = function buildCheckData(url, options, args, timestamp) {
    return [options.method.toUpperCase(), timestamp, (0, _url.parse)(url).path, (0, _includes2.default)(['POST', 'PUT'], options.method) ? !options.rawBody ? phpJsonEncode(jsonifyArgs(args)) : phpJsonEncode(args) : phpJsonEncode([])].join('\n');
  };

  var phpJsonEncode = exports.phpJsonEncode = function phpJsonEncode(val) {
    return (0, _json_encode2.default)(typeof val === 'undefined' ? null : val).replace(/(?!\\)\//g, '\\/');
  };

  var onlyAmpEncode = exports.onlyAmpEncode = function onlyAmpEncode(str) {
    return (str + '').toString().replace('&', '%26');
  };

  var phpUrlEncode = exports.phpUrlEncode = _deskbookersPhpurlencode2.default;
});