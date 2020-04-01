"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Arrow = _interopRequireDefault(require("./Arrow"));

var _Circle = _interopRequireDefault(require("./Circle"));

var _Crop = _interopRequireDefault(require("./Crop"));

var _Download = _interopRequireDefault(require("./Download"));

var _Eraser = _interopRequireDefault(require("./Eraser"));

var _Mosaic = _interopRequireDefault(require("./Mosaic"));

var _Pen = _interopRequireDefault(require("./Pen"));

var _Rect = _interopRequireDefault(require("./Rect"));

var _Repeal = _interopRequireDefault(require("./Repeal"));

var _Text = _interopRequireDefault(require("./Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginFactory = function PluginFactory() {
  _classCallCheck(this, PluginFactory);

  this.plugins = [new _Arrow["default"](), new _Circle["default"](), new _Crop["default"](), new _Download["default"](), new _Eraser["default"](), new _Mosaic["default"](), new _Pen["default"](), new _Rect["default"](), new _Repeal["default"](), new _Text["default"]()];
};

exports["default"] = PluginFactory;