(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/classCallCheck', './resources', './utils/requests'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/classCallCheck'), require('./resources'), require('./utils/requests'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck, global.resources, global.requests);
    global.index = mod.exports;
  }
})(this, function (exports, _classCallCheck2, _resources, _requests) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authenticate = authenticate;

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _resources2 = _interopRequireDefault(_resources);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var API_HOST = 'backoffice.2cnnct.com';
  var API_VERSION = 1;
  var API_LANGUAGE = 'en-gb';
  var API_RESELLER_ID = 10000;
  var API_AVAILABILITY_HOST = 'api-availability.deskbookers.com';
  var API_AVAILABILITY_PATH = '';
  var API_FEATURE_HOST = 'api-features.deskbookers.com';
  var API_FEATURE_PATH = '';
  var API_NOTIFICATIONS_HOST = 'api-notifications.deskbookers.com';
  var API_NOTIFICATIONS_PATH = '';
  var API_PAYMENTS_HOST = 'api-payments.deskbookers.com';
  var API_PAYMENTS_PATH = '';
  var API_REPORTS_HOST = 'api-reports.deskbookers.com';
  var API_REPORTS_PATH = '';
  var API_SEARCH_HOST = 'api-search.deskbookers.com';
  var API_SEARCH_PATH = '';
  var API_SEO_HOST = 'api-seo.deskbookers.com';
  var API_SEO_PATH = '';

  var Deskbookers = function Deskbookers(_ref) {
    var _ref$https = _ref.https,
        https = _ref$https === undefined ? true : _ref$https,
        _ref$host = _ref.host,
        host = _ref$host === undefined ? API_HOST : _ref$host,
        _ref$version = _ref.version,
        version = _ref$version === undefined ? API_VERSION : _ref$version,
        _ref$language = _ref.language,
        language = _ref$language === undefined ? API_LANGUAGE : _ref$language,
        _ref$resellerId = _ref.resellerId,
        resellerId = _ref$resellerId === undefined ? API_RESELLER_ID : _ref$resellerId,
        _ref$sources = _ref.sources,
        sources = _ref$sources === undefined ? {
      availability: {
        host: API_AVAILABILITY_HOST,
        path: API_AVAILABILITY_PATH
      },
      features: {
        host: API_FEATURE_HOST,
        path: API_FEATURE_PATH
      },
      notifications: {
        host: API_NOTIFICATIONS_HOST,
        path: API_NOTIFICATIONS_PATH
      },
      payments: {
        host: API_PAYMENTS_HOST,
        path: API_PAYMENTS_PATH
      },
      reports: {
        host: API_REPORTS_HOST,
        path: API_REPORTS_PATH
      },
      search: {
        host: API_SEARCH_HOST,
        path: API_SEARCH_PATH
      },
      seo: {
        host: API_SEO_HOST,
        path: API_SEO_PATH
      }
    } : _ref$sources;
    (0, _classCallCheck3.default)(this, Deskbookers);

    // Options
    this.https = https;
    this.host = host;
    this.version = version;
    this.language = language;
    this.resellerId = resellerId;
    this.sources = sources;
    this.session = null;

    // Initialise resources
    for (var resource in _resources2.default) {
      this[resource] = new _resources2.default[resource](this);
    }
  };

  exports.default = Deskbookers;


  /**
   * Authenticate a request
   *
   * @param String url URL of the request
   * @param String method Method of the request (e.g. POST or GET)
   * @param Object data Either the POST or the GET (query) data
   * @param String timestamp The timestamp header
   * @param String privateKey The private key retrieved using the Authenticate header
   * @param String hash The hash to compare the check hash to
   * @return Bool
   */
  function authenticate(url, method, data, timestamp, privateKey, hash) {
    var rawBody = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    var checkData = (0, _requests.buildCheckData)(url, { method: method, rawBody: rawBody }, data, timestamp);
    return (0, _requests.signData)(checkData, privateKey) === hash;
  }
});