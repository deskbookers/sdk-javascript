(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/get', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/extends', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', './Resource', 'md5-hex', 'moment', 'rndm', 'lodash/forEach', 'lodash/isPlainObject'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/get'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/extends'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('./Resource'), require('md5-hex'), require('moment'), require('rndm'), require('lodash/forEach'), require('lodash/isPlainObject'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.get, global.regenerator, global.asyncToGenerator, global._extends, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.Resource, global.md5Hex, global.moment, global.rndm, global.forEach, global.isPlainObject);
    global.Cart = mod.exports;
  }
})(this, function (exports, _get5, _regenerator, _asyncToGenerator2, _extends2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _Resource2, _md5Hex, _moment, _rndm, _forEach, _isPlainObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.unix = exports.normalizeDate = exports.Space = exports.SpaceProduct = exports.Product = exports.Item = undefined;

  var _get6 = _interopRequireDefault(_get5);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _extends3 = _interopRequireDefault(_extends2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _Resource3 = _interopRequireDefault(_Resource2);

  var _md5Hex2 = _interopRequireDefault(_md5Hex);

  var _moment2 = _interopRequireDefault(_moment);

  var _rndm2 = _interopRequireDefault(_rndm);

  var _forEach2 = _interopRequireDefault(_forEach);

  var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Cart = function (_Resource) {
    (0, _inherits3.default)(Cart, _Resource);

    function Cart(api, data) {
      (0, _classCallCheck3.default)(this, Cart);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Cart.__proto__ || (0, _getPrototypeOf2.default)(Cart)).call(this, api));

      _this.update(data);
      _this.possibleVouchers_ = {};
      return _this;
    }

    (0, _createClass3.default)(Cart, [{
      key: 'update',
      value: function update(data) {
        this.data = data || {};
        this.data.spaces = this.data.spaces || {};
        return this;
      }
    }, {
      key: 'newInstance',
      value: function newInstance() {
        return new this.constructor(this.api);
      }
    }, {
      key: 'setGroup',
      value: function setGroup(groupId) {
        this.data.group = groupId;
        return this;
      }
    }, {
      key: 'getGroup',
      value: function getGroup() {
        return this.data.group || null;
      }
    }, {
      key: 'setVoucherCode',
      value: function setVoucherCode(code) {
        this.data.voucherCode = code;
        return this;
      }
    }, {
      key: 'getVoucherCode',
      value: function getVoucherCode() {
        return this.data.voucherCode;
      }
    }, {
      key: 'possibleVouchers',
      value: function possibleVouchers() {
        return this.possibleVouchers_;
      }
    }, {
      key: 'items',
      value: function items() {
        var items = [];
        (0, _forEach2.default)(this.data.spaces, function (space) {
          items.push(space);
          (0, _forEach2.default)(space.products(), function (product) {
            items.push(product);
          });
        });
        return items;
      }
    }, {
      key: 'spaces',
      value: function spaces() {
        return this.data.spaces;
      }
    }, {
      key: 'addSpace',
      value: function addSpace(space) {
        space = new Space(this, space);
        this.data.spaces[space.hash()] = space;
        return space;
      }
    }, {
      key: 'getSpace',
      value: function getSpace(hash) {
        return this.data.spaces[hash] || null;
      }
    }, {
      key: 'removeSpace',
      value: function removeSpace(hash) {
        delete this.data.spaces[hash];
        return this;
      }
    }, {
      key: 'batchCheckData',
      value: function batchCheckData() {
        var batch = [];
        var bookingIndex = 0;

        // Spaces
        (0, _forEach2.default)(this.spaces(), function (space) {
          // Add space check
          batch.push((0, _extends3.default)({ bookingIndex: bookingIndex }, space.checkData()));

          // Add space products
          (0, _forEach2.default)(space.products(), function (product) {
            return batch.push((0, _extends3.default)({ bookingIndex: bookingIndex }, product.checkData()));
          });

          ++bookingIndex;
        });

        return batch;
      }
    }, {
      key: 'refresh',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var ignoreBooking = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var batch, _ref2, voucherCodes, results, i;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  batch = this.batchCheckData();
                  _context.next = 3;
                  return this.request({
                    method: 'POST',
                    path: 'booking/batchCheck', // TODO: implement this method in User API
                    params: {
                      group: this.getGroup(),
                      voucherCode: this.getVoucherCode(),
                      ignoreBooking: ignoreBooking && ignoreBooking.id || null,
                      action: ignoreBooking && ignoreBooking.action || null,
                      batch: batch
                    }
                  });

                case 3:
                  _ref2 = _context.sent;
                  voucherCodes = _ref2.voucherCodes;
                  results = _ref2.results;


                  // Vouchers
                  this.possibleVouchers_ = {};
                  for (i = 0; i < voucherCodes.length; ++i) {
                    this.possibleVouchers_['c' + voucherCodes[i].code] = voucherCodes[i];
                  }

                  if (!(!this.getVoucherCode() && voucherCodes.length > 0)) {
                    _context.next = 13;
                    break;
                  }

                  this.setVoucherCode(voucherCodes[0].code);

                  // Refresh with first voucher
                  _context.next = 12;
                  return this.refresh(ignoreBooking);

                case 12:
                  return _context.abrupt('return');

                case 13:

                  // Update items
                  (0, _forEach2.default)(this.spaces(), function (space) {
                    // Update space
                    if (space.hash() in results) {
                      space.update((0, _extends3.default)({}, space.data, {
                        info: results[space.hash()]
                      }));
                    }

                    (0, _forEach2.default)(space.products(), function (product) {
                      // Update product
                      if (product.hash() in results) {
                        product.update((0, _extends3.default)({}, product.data, {
                          info: results[product.hash()]
                        }));
                      }
                    });
                  });

                case 14:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function refresh() {
          return _ref.apply(this, arguments);
        }

        return refresh;
      }()
    }, {
      key: 'available',
      value: function available() {
        var available = true;
        (0, _forEach2.default)(this.items(), function (item) {
          if (!item.available()) {
            available = false;
            return false;
          }
        });
        return available;
      }
    }]);
    return Cart;
  }(_Resource3.default);

  exports.default = Cart;

  var Item = exports.Item = function () {
    function Item(cart, data) {
      (0, _classCallCheck3.default)(this, Item);

      this.cart = cart;
      this.update(data);
    }

    (0, _createClass3.default)(Item, [{
      key: 'hash',
      value: function hash() {
        return this.data.hash;
      }
    }, {
      key: 'update',
      value: function update(data) {
        // Set data
        if (data instanceof Item) data = data.data;
        this.data = data || {};

        // Make sure it has an unique hash
        if (!this.data.hash) this.data.hash = this.constructor.generateHash();

        // Make sure it has a quantity
        if (!this.data.quantity) this.data.quantity = 1;

        // Normalize start/end
        this.data.start = normalizeDate(this.data.start);
        this.data.end = normalizeDate(this.data.end);

        return this;
      }
    }, {
      key: 'meta',
      value: function meta() {
        return this.data.meta || {};
      }
    }, {
      key: 'start',
      value: function start() {
        return this.data.start || null;
      }
    }, {
      key: 'end',
      value: function end() {
        return this.data.end || null;
      }
    }, {
      key: 'checkData',
      value: function checkData() {
        return {
          id: this.data.hash,
          quantity: this.data.quantity,
          start: unix(this.data.start),
          end: unix(this.data.end)
        };
      }
    }, {
      key: 'export',
      value: function _export() {
        return (0, _extends3.default)({}, this.data, {
          start: unix(this.data.start),
          end: unix(this.data.end)
        });
      }
    }, {
      key: 'available',
      value: function available() {
        return this.data.info.ranges && this.data.info.ranges.length > 0 && this.start() && this.end() && this.data.info.ranges[0].start <= unix(this.start()) && this.data.info.ranges[0].end >= unix(this.end()) && this.data.info.ranges[0].quantity >= this.data.quantity;
      }
    }], [{
      key: 'generateHash',
      value: function generateHash() {
        return 'h' + (0, _md5Hex2.default)((0, _rndm2.default)(64) + '-' + new Date().getTime());
      }
    }]);
    return Item;
  }();

  var Product = exports.Product = function (_Item) {
    (0, _inherits3.default)(Product, _Item);

    function Product() {
      (0, _classCallCheck3.default)(this, Product);
      return (0, _possibleConstructorReturn3.default)(this, (Product.__proto__ || (0, _getPrototypeOf2.default)(Product)).apply(this, arguments));
    }

    (0, _createClass3.default)(Product, [{
      key: 'update',
      value: function update() {
        var _get2;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_get2 = (0, _get6.default)(Product.prototype.__proto__ || (0, _getPrototypeOf2.default)(Product.prototype), 'update', this)).call.apply(_get2, [this].concat(args));

        // Normalize workplace
        if (this.data.info && this.data.info.product) {
          this.data.meta = this.data.info.product;
        }
      }
    }, {
      key: 'checkData',
      value: function checkData() {
        return (0, _extends3.default)({}, (0, _get6.default)(Product.prototype.__proto__ || (0, _getPrototypeOf2.default)(Product.prototype), 'checkData', this).call(this), {
          productId: this.data.id,
          price: this.data.override || null
        });
      }
    }]);
    return Product;
  }(Item);

  var SpaceProduct = exports.SpaceProduct = function (_Product) {
    (0, _inherits3.default)(SpaceProduct, _Product);

    function SpaceProduct(space, data) {
      (0, _classCallCheck3.default)(this, SpaceProduct);

      var _this3 = (0, _possibleConstructorReturn3.default)(this, (SpaceProduct.__proto__ || (0, _getPrototypeOf2.default)(SpaceProduct)).call(this, space.cart, data));

      _this3.space = space;
      _this3.update(data);
      return _this3;
    }

    (0, _createClass3.default)(SpaceProduct, [{
      key: 'update',
      value: function update() {
        var _get3;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        (_get3 = (0, _get6.default)(SpaceProduct.prototype.__proto__ || (0, _getPrototypeOf2.default)(SpaceProduct.prototype), 'update', this)).call.apply(_get3, [this].concat(args));

        // Copy start / end from space
        if (this.space) {
          this.data.start = this.space.data.start;
          this.data.end = this.space.data.end;
        }

        return this;
      }
    }]);
    return SpaceProduct;
  }(Product);

  var Space = exports.Space = function (_Item2) {
    (0, _inherits3.default)(Space, _Item2);

    function Space() {
      (0, _classCallCheck3.default)(this, Space);
      return (0, _possibleConstructorReturn3.default)(this, (Space.__proto__ || (0, _getPrototypeOf2.default)(Space)).apply(this, arguments));
    }

    (0, _createClass3.default)(Space, [{
      key: 'products',
      value: function products() {
        return this.data.products;
      }
    }, {
      key: 'addProduct',
      value: function addProduct(product) {
        product = new SpaceProduct(this, product);
        this.data.products[product.hash()] = product;
        return product;
      }
    }, {
      key: 'getProduct',
      value: function getProduct(hash) {
        return this.data.products[hash] || null;
      }
    }, {
      key: 'removeProduct',
      value: function removeProduct(hash) {
        delete this.data.products[hash];
        return this;
      }
    }, {
      key: 'setProducts',
      value: function setProducts(products) {
        var _this5 = this;

        // Normalize the products object
        this.data.products = {};
        if (Array.isArray(products) || (0, _isPlainObject2.default)(products)) {
          (0, _forEach2.default)(products, function (product) {
            product = new SpaceProduct(_this5, product);
            _this5.data.products[product.hash()] = product;
          });
        }

        return this;
      }
    }, {
      key: 'update',
      value: function update() {
        var _get4;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        (_get4 = (0, _get6.default)(Space.prototype.__proto__ || (0, _getPrototypeOf2.default)(Space.prototype), 'update', this)).call.apply(_get4, [this].concat(args));

        // Normalize products
        this.setProducts(this.data.products);

        // Normalize workplace
        if (this.data.info && this.data.info.workplace) {
          this.data.meta = this.data.info.workplace;
        }

        // Normalize people
        var _data = this.data,
            people = _data.people,
            min = _data.minimum_capacity,
            max = _data.maximum_capacity;

        if (min && max) this.data.people = Math.max(min, Math.min(max, people));

        return this;
      }
    }, {
      key: 'checkData',
      value: function checkData() {
        return (0, _extends3.default)({}, (0, _get6.default)(Space.prototype.__proto__ || (0, _getPrototypeOf2.default)(Space.prototype), 'checkData', this).call(this), {
          workplaceId: this.data.id,
          people: this.data.people,
          price: this.data.override || null,
          recurring: !!(this.data.recurringData && this.data.recurringData.enabled)
        });
      }
    }, {
      key: 'export',
      value: function _export() {
        return (0, _extends3.default)({}, (0, _get6.default)(Space.prototype.__proto__ || (0, _getPrototypeOf2.default)(Space.prototype), 'export', this).call(this), {
          products: this.products().map(function (product) {
            return product.export();
          })
        });
      }
    }]);
    return Space;
  }(Item);

  var normalizeDate = exports.normalizeDate = function normalizeDate(date) {
    return date ? (0, _moment2.default)(date) : null;
  };

  var unix = exports.unix = function unix(date) {
    var normalized = normalizeDate(date);
    return normalized && normalized.unix() || null;
  };
});