"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _konva = _interopRequireDefault(require("konva"));

var _Plugin2 = _interopRequireDefault(require("./Plugin"));

var _constants = require("../common/constants");

var _utils = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Arrow = /*#__PURE__*/function (_Plugin) {
  _inherits(Arrow, _Plugin);

  var _super = _createSuper(Arrow);

  function Arrow() {
    var _this;

    _classCallCheck(this, Arrow);

    _this = _super.call(this);
    _this.name = 'arrow';
    _this.iconfont = 'iconfont icon-arrow';
    _this.title = '插入箭头';
    _this.params = ['strokeWidth', 'color'];
    _this.defaultParamValue = {
      strokeWidth: 2,
      lineType: 'solid',
      color: '#F5222D'
    };
    _this.shapeName = 'arrow';
    _this.lastArrow = null;
    _this.transformer = null;
    _this.selectedNode = null;
    _this.isPaint = false;
    _this.started = false;
    _this.startPoints = [0, 0];

    _this.enableTransform = function (drawEventParams, node) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer;

      if (!_this.transformer) {
        _this.transformer = new _konva["default"].Transformer(_extends(_extends({}, _constants.transformerStyle), {
          rotateEnabled: true
        }));
        drawLayer.add(_this.transformer);

        _this.transformer.attachTo(node);

        node.on('mouseenter', function () {
          stage.container().style.cursor = 'move';
        });
        node.on('mouseleave', function () {
          stage.container().style.cursor = 'default';
        });
        stage.container().style.cursor = 'move';
      }

      node && node.draggable(true);
      drawLayer.draw();
    };

    _this.disableTransform = function (drawEventParams, node, remove) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer,
          pubSub = drawEventParams.pubSub;

      if (_this.transformer) {
        _this.transformer.remove();

        _this.transformer = null;
      }

      if (node) {
        node.draggable(false);
        node.off('mouseenter');
        node.off('mouseleave');
        stage.container().style.cursor = 'default';

        if (remove) {
          node.hide(); // 使用隐藏节点占位并覆盖堆栈中已有节点

          pubSub.pub('PUSH_HISTORY', node);
          node.remove();
        }
      }

      _this.selectedNode = null;
      drawLayer.draw();
    };

    _this.onEnter = function (drawEventParams) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer;
      var container = stage.container();
      container.tabIndex = 1; // make it focusable

      container.focus();
      container.addEventListener('keyup', function (e) {
        if (e.key === 'Backspace' && _this.selectedNode) {
          _this.disableTransform(drawEventParams, _this.selectedNode, true);

          drawLayer.draw();
        }
      });
    };

    _this.onClick = function (drawEventParams) {
      var event = drawEventParams.event;

      if (event.target.name && event.target.name() === 'arrow') {
        // 之前没有选中节点或者在相同节点之间切换点击
        if (!_this.selectedNode || _this.selectedNode._id !== event.target._id) {
          _this.selectedNode && _this.disableTransform(drawEventParams, _this.selectedNode);

          _this.enableTransform(drawEventParams, event.target);

          _this.selectedNode = event.target;
        }
      } else {
        _this.disableTransform(drawEventParams, _this.selectedNode);
      }
    };

    _this.onDrawStart = function () {
      _this.isPaint = true;
    };

    _this.onDraw = function (drawEventParams) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer,
          paramValue = drawEventParams.paramValue,
          pubSub = drawEventParams.pubSub;
      var pos = stage.getPointerPosition();
      if (!_this.isPaint || _this.transformer || !pos) return;

      if (!_this.started && pos) {
        _this.startPoints = [pos.x, pos.y];
        var strokeColor = paramValue && paramValue.color ? paramValue.color : _this.defaultParamValue.color;
        _this.lastArrow = new _konva["default"].Arrow({
          id: (0, _utils.uuid)(),
          name: 'arrow',
          stroke: strokeColor,
          strokeWidth: paramValue && paramValue.strokeWidth ? paramValue.strokeWidth : _this.defaultParamValue.strokeWidth,
          globalCompositeOperation: 'source-over',
          points: _this.startPoints,
          dashEnabled: !!(paramValue && paramValue.lineType && paramValue.lineType === 'dash'),
          dash: [8],
          fill: strokeColor,
          strokeScaleEnabled: false
        });

        _this.lastArrow.on('transformend', function () {
          pubSub.pub('PUSH_HISTORY', this);
        });

        _this.lastArrow.on('dragend', function () {
          pubSub.pub('PUSH_HISTORY', this);
        });

        drawLayer.add(_this.lastArrow);
        _this.started = true;
      }

      _this.lastArrow.points([_this.startPoints[0], _this.startPoints[1], pos.x, pos.y]);

      drawLayer.batchDraw();
    };

    _this.onDrawEnd = function (drawEventParams) {
      var pubSub = drawEventParams.pubSub; // mouseup event is triggered by move event but click event

      if (_this.started) {
        _this.disableTransform(drawEventParams, _this.selectedNode);

        if (_this.lastArrow) {
          pubSub.pub('PUSH_HISTORY', _this.lastArrow);
        }
      }

      _this.isPaint = false;
      _this.started = false;
    };

    _this.onLeave = function (drawEventParams) {
      _this.isPaint = false;
      _this.started = false;

      _this.disableTransform(drawEventParams, _this.selectedNode);
    };

    _this.onNodeRecreate = function (drawEventParams, node) {
      var pubSub = drawEventParams.pubSub;
      node.on('transformend', function () {
        pubSub.pub('PUSH_HISTORY', this);
      });
      node.on('dragend', function () {
        pubSub.pub('PUSH_HISTORY', this);
      });
    };

    _this.title = _utils.i18n.t("image.editor.plugin.".concat(_this.name));
    return _this;
  }

  return Arrow;
}(_Plugin2["default"]);

exports["default"] = Arrow;