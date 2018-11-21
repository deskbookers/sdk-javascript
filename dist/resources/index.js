(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './account', './Actions', './Availability', './Cart', './Events', './Features', './Spaces', './Notifications', './Bookings', './Venues', './payments', './reports', './Search', './TermsAndConditions', './Seo'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./account'), require('./Actions'), require('./Availability'), require('./Cart'), require('./Events'), require('./Features'), require('./Spaces'), require('./Notifications'), require('./Bookings'), require('./Venues'), require('./payments'), require('./reports'), require('./Search'), require('./TermsAndConditions'), require('./Seo'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.account, global.Actions, global.Availability, global.Cart, global.Events, global.Features, global.Spaces, global.Notifications, global.Bookings, global.Venues, global.payments, global.reports, global.Search, global.TermsAndConditions, global.Seo);
    global.index = mod.exports;
  }
})(this, function (module, exports, _account, _Actions, _Availability, _Cart, _Events, _Features, _Spaces, _Notifications, _Bookings, _Venues, _payments, _reports, _Search, _TermsAndConditions, _Seo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _account2 = _interopRequireDefault(_account);

  var _Actions2 = _interopRequireDefault(_Actions);

  var _Availability2 = _interopRequireDefault(_Availability);

  var _Cart2 = _interopRequireDefault(_Cart);

  var _Events2 = _interopRequireDefault(_Events);

  var _Features2 = _interopRequireDefault(_Features);

  var _Spaces2 = _interopRequireDefault(_Spaces);

  var _Notifications2 = _interopRequireDefault(_Notifications);

  var _Bookings2 = _interopRequireDefault(_Bookings);

  var _Venues2 = _interopRequireDefault(_Venues);

  var _payments2 = _interopRequireDefault(_payments);

  var _reports2 = _interopRequireDefault(_reports);

  var _Search2 = _interopRequireDefault(_Search);

  var _TermsAndConditions2 = _interopRequireDefault(_TermsAndConditions);

  var _Seo2 = _interopRequireDefault(_Seo);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    account: _account2.default,
    actions: _Actions2.default,
    availability: _Availability2.default,
    cart: _Cart2.default,
    events: _Events2.default,
    features: _Features2.default,
    spaces: _Spaces2.default,
    notifications: _Notifications2.default,
    bookings: _Bookings2.default,
    venues: _Venues2.default,
    payments: _payments2.default,
    reports: _reports2.default,
    search: _Search2.default,
    termsAndConditions: _TermsAndConditions2.default,
    seo: _Seo2.default
  };
  module.exports = exports['default'];
});