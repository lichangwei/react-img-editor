"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _konva = _interopRequireDefault(require("konva"));

var _Plugin2 = _interopRequireDefault(require("./Plugin"));

var _utils = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pen = /*#__PURE__*/function (_Plugin) {
  _inherits(Pen, _Plugin);

  var _super = _createSuper(Pen);

  function Pen() {
    var _this;

    _classCallCheck(this, Pen);

    _this = _super.call(this);
    _this.name = 'pen';
    _this.iconfont = 'iconfont icon-pen';
    _this.title = '画笔';
    _this.params = ['strokeWidth', 'lineType', 'color'];
    _this.defaultParamValue = {
      strokeWidth: 2,
      lineType: 'solid',
      color: '#F5222D'
    };
    _this.lastLine = null;
    _this.isPaint = false;

    _this.onDrawStart = function (drawEventParams) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer,
          paramValue = drawEventParams.paramValue;
      var pos = stage.getPointerPosition();
      if (!pos) return;
      _this.isPaint = true;
      _this.lastLine = new _konva["default"].Line({
        id: (0, _utils.uuid)(),
        stroke: paramValue && paramValue.color ? paramValue.color : _this.defaultParamValue.color,
        strokeWidth: paramValue && paramValue.strokeWidth ? paramValue.strokeWidth : _this.defaultParamValue.strokeWidth,
        globalCompositeOperation: 'source-over',
        points: [pos.x, pos.y],
        dashEnabled: !!(paramValue && paramValue.lineType && paramValue.lineType === 'dash'),
        dash: [8],
        tension: 1,
        lineCap: 'round',
        lineJoin: 'round'
      });
      drawLayer.add(_this.lastLine);
    };

    _this.onDraw = function (drawEventParams) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer;
      var pos = stage.getPointerPosition();
      if (!_this.isPaint || !pos) return;

      var newPoints = _this.lastLine.points().concat([pos.x, pos.y]);

      _this.lastLine.points(newPoints);

      drawLayer.batchDraw();
    };

    _this.onDrawEnd = function (drawEventParams) {
      var pubSub = drawEventParams.pubSub;
      _this.isPaint = false;
      pubSub.pub('PUSH_HISTORY', _this.lastLine);
    };

    _this.onLeave = function () {
      _this.isPaint = false;
    };

    _this.title = _utils.i18n.t("image.editor.plugin.".concat(_this.name));
    return _this;
  }

  return Pen;
}(_Plugin2["default"]);

exports["default"] = Pen;