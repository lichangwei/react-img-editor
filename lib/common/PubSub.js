"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubSub = function PubSub(id) {
  var _this = this;

  _classCallCheck(this, PubSub);

  this.pub = function (name, param) {
    _pubsubJs["default"].publish("".concat(_this.id, "_").concat(name), param);
  };

  this.sub = function (name, callback) {
    _pubsubJs["default"].subscribe("".concat(_this.id, "_").concat(name), callback);
  };

  this.id = id;
};

exports["default"] = PubSub;