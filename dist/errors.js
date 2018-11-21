(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.getPrototypeOf, global.classCallCheck, global.possibleConstructorReturn, global.inherits);
    global.errors = mod.exports;
  }
})(this, function (exports, _getPrototypeOf, _classCallCheck2, _possibleConstructorReturn2, _inherits2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InvalidResponseError = exports.DeskbookersError = undefined;

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MAX_ERROR_LENGTH = 100;

  var DeskbookersError = exports.DeskbookersError = function (_Error) {
    (0, _inherits3.default)(DeskbookersError, _Error);

    function DeskbookersError(message) {
      (0, _classCallCheck3.default)(this, DeskbookersError);

      var _this = (0, _possibleConstructorReturn3.default)(this, (DeskbookersError.__proto__ || (0, _getPrototypeOf2.default)(DeskbookersError)).call(this, message));

      _this.name = 'DeskbookersError';
      return _this;
    }

    return DeskbookersError;
  }(Error);

  var InvalidResponseError = exports.InvalidResponseError = function (_DeskbookersError) {
    (0, _inherits3.default)(InvalidResponseError, _DeskbookersError);

    function InvalidResponseError(text) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      (0, _classCallCheck3.default)(this, InvalidResponseError);

      // Prepare text
      text = '' + (text || '');
      var shortText = text;
      if (shortText.length > MAX_ERROR_LENGTH) {
        shortText = shortText.substr(0, MAX_ERROR_LENGTH) + '...';
      }

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (InvalidResponseError.__proto__ || (0, _getPrototypeOf2.default)(InvalidResponseError)).call(this, 'Invalid API response received ' + (url ? 'from ' + url : '') + ': ' + shortText));

      _this2.name = 'InvalidResponseError';
      _this2.text = text;
      return _this2;
    }

    return InvalidResponseError;
  }(DeskbookersError);
});