(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../Resource', './Users'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../Resource'), require('./Users'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.getPrototypeOf, global.classCallCheck, global.possibleConstructorReturn, global.inherits, global.Resource, global.Users);
    global.index = mod.exports;
  }
})(this, function (module, exports, _getPrototypeOf, _classCallCheck2, _possibleConstructorReturn2, _inherits2, _Resource2, _Users) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _Resource3 = _interopRequireDefault(_Resource2);

  var _Users2 = _interopRequireDefault(_Users);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Payments = function (_Resource) {
    (0, _inherits3.default)(Payments, _Resource);

    function Payments(api) {
      (0, _classCallCheck3.default)(this, Payments);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Payments.__proto__ || (0, _getPrototypeOf2.default)(Payments)).call(this, api));

      _this.source = 'payments';


      // Create sub-resources
      _this.users = new _Users2.default(api);
      return _this;
    }

    return Payments;
  }(_Resource3.default);

  exports.default = Payments;
  module.exports = exports['default'];
});