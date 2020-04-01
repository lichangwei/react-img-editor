"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _konva = _interopRequireDefault(require("konva"));

var _PubSub = _interopRequireDefault(require("../common/PubSub"));

var _react = _interopRequireDefault(require("react"));

var _EditorContext = require("./EditorContext");

var _constants = require("../common/constants");

var _utils = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Palette = /*#__PURE__*/function (_React$Component) {
  _inherits(Palette, _React$Component);

  var _super = _createSuper(Palette);

  function Palette(props) {
    var _this;

    _classCallCheck(this, Palette);

    _this = _super.call(this, props);
    _this.containerId = _constants.prefixCls + (0, _utils.uuid)();
    _this.stage = null;
    _this.imageLayer = null;
    _this.drawLayer = null;
    _this.imageData = null;
    _this.historyStack = [];

    _this.init = function () {
      var _this$props = _this.props,
          getStage = _this$props.getStage,
          imageObj = _this$props.imageObj;
      _this.stage = new _konva["default"].Stage({
        container: _this.containerId,
        width: _this.canvasWidth,
        height: _this.canvasHeight
      });
      getStage && getStage(_this.resetStage(_this.stage));
      var img = new _konva["default"].Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: _this.canvasWidth,
        height: _this.canvasHeight
      });
      _this.imageLayer = new _konva["default"].Layer();

      _this.stage.add(_this.imageLayer);

      _this.imageLayer.setZIndex(0);

      _this.imageLayer.add(img);

      _this.imageLayer.draw();

      _this.imageData = _this.generateImageData(imageObj, _this.canvasWidth, _this.canvasHeight);
      _this.drawLayer = new _konva["default"].Layer();

      _this.stage.add(_this.drawLayer);

      _this.bindEvents();
    }; // 裁剪等操作执行后需要重新初始化


    _this.reload = function (imgObj, width, height) {
      var getStage = _this.props.getStage;

      _this.removeEvents();

      _this.historyStack = [];
      _this.stage = new _konva["default"].Stage({
        container: _this.containerId,
        width: width,
        height: height
      });
      getStage && getStage(_this.resetStage(_this.stage));
      var img = new _konva["default"].Image({
        x: 0,
        y: 0,
        image: imgObj,
        width: width,
        height: height
      });
      _this.imageLayer = new _konva["default"].Layer();

      _this.stage.add(_this.imageLayer);

      _this.imageLayer.add(img);

      _this.imageLayer.draw();

      _this.imageData = _this.generateImageData(imgObj, width, height);
      _this.drawLayer = new _konva["default"].Layer();

      _this.stage.add(_this.drawLayer);

      _this.bindEvents();
    };

    _this.resetStage = function (stage) {
      // @ts-ignore
      stage._pixelRatio = _this.pixelRatio; // @ts-ignore

      stage.clearAndToCanvas = function (config) {
        var currentPlugin = _this.props.currentPlugin;
        currentPlugin && currentPlugin.onLeave && currentPlugin.onLeave(_this.getDrawEventParams(null));
        return stage.toCanvas(config);
      };

      return stage;
    };

    _this.bindEvents = function () {
      if (!_this.stage || !_this.drawLayer) return;
      var _this$props2 = _this.props,
          plugins = _this$props2.plugins,
          currentPlugin = _this$props2.currentPlugin,
          handlePluginChange = _this$props2.handlePluginChange;

      _this.removeEvents();

      _this.stage.add(_this.drawLayer);

      _this.drawLayer.setZIndex(1);

      _this.stage.on('click tap', function (e) {
        if (e.target.name && e.target.name()) {
          var name = e.target.name();

          var _loop = function _loop(i) {
            // 点击具体图形，会切到对应的插件去
            if (plugins[i].shapeName && plugins[i].shapeName === name && (!currentPlugin || !currentPlugin.shapeName || name !== currentPlugin.shapeName)) {
              (function (event) {
                setTimeout(function () {
                  plugins[i].onClick && plugins[i].onClick(_this.getDrawEventParams(event));
                });
              })(e);

              handlePluginChange(plugins[i]);
              return {
                v: void 0
              };
            }
          };

          for (var i = 0; i < plugins.length; i++) {
            var _ret = _loop(i);

            if (typeof _ret === "object") return _ret.v;
          }
        }

        if (currentPlugin && currentPlugin.onClick) {
          currentPlugin.onClick(_this.getDrawEventParams(e));
        }
      });

      _this.stage.on('mousedown touchstart', function (e) {
        if (currentPlugin && currentPlugin.onDrawStart) {
          currentPlugin.onDrawStart(_this.getDrawEventParams(e));
        }
      });

      _this.stage.on('mousemove touchmove', function (e) {
        if (currentPlugin && currentPlugin.onDraw) {
          currentPlugin.onDraw(_this.getDrawEventParams(e));
        }
      });

      _this.stage.on('mouseup touchend', function (e) {
        if (currentPlugin && currentPlugin.onDrawEnd) {
          currentPlugin.onDrawEnd(_this.getDrawEventParams(e));
        }
      });
    };

    _this.removeEvents = function () {
      if (!_this.stage) return;

      _this.stage.off('click tap');

      _this.stage.off('mousedown touchstart');

      _this.stage.off('mousemove touchmove');

      _this.stage.off('mouseup touchend');
    };

    _this.subHistoryStack = function () {
      _this.pubSub.sub('PUSH_HISTORY', function (_, node) {
        var _this$props3 = _this.props,
            toolbarItemConfig = _this$props3.toolbarItemConfig,
            updateToolbarItemConfig = _this$props3.updateToolbarItemConfig; // 撤销按钮更新为激活状态

        if (_this.historyStack.length === 0) {
          var newToolbarItemConfig = _extends({}, toolbarItemConfig);

          if (newToolbarItemConfig.repeal) {
            newToolbarItemConfig.repeal.disable = false;
            updateToolbarItemConfig(newToolbarItemConfig);
          }
        }

        _this.historyStack.push(node.toObject());
      }); // 仅接收状态，不实际 pop history


      _this.pubSub.sub('POP_HISTORY', function (_, historyStack) {
        var _this$props4 = _this.props,
            toolbarItemConfig = _this$props4.toolbarItemConfig,
            updateToolbarItemConfig = _this$props4.updateToolbarItemConfig;

        if (historyStack.length === 0) {
          var newToolbarItemConfig = _extends({}, toolbarItemConfig);

          if (newToolbarItemConfig.repeal) {
            newToolbarItemConfig.repeal.disable = true;
            updateToolbarItemConfig(newToolbarItemConfig);
          }
        }
      });
    }; // 主要用于在马赛克时，进行图片像素处理


    _this.generateImageData = function (imgObj, width, height) {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(imgObj, 0, 0, width, height);
      return ctx.getImageData(0, 0, width, height);
    }; // 生命周期的统一参数生成函数


    _this.getDrawEventParams = function (e) {
      var props = _this.props;
      var drawEventParams = {
        event: e,
        stage: _this.stage,
        imageLayer: _this.imageLayer,
        drawLayer: _this.drawLayer,
        imageData: _this.imageData,
        reload: _this.reload,
        historyStack: _this.historyStack,
        pixelRatio: _this.pixelRatio,
        pubSub: _this.pubSub,
        // editor context
        containerWidth: props.containerWidth,
        containerHeight: props.containerHeight,
        plugins: props.plugins,
        toolbar: props.toolbar,
        currentPlugin: props.currentPlugin,
        handlePluginChange: props.handlePluginChange,
        paramValue: props.paramValue,
        handlePluginParamValueChange: props.handlePluginParamValueChange,
        toolbarItemConfig: props.toolbarItemConfig,
        updateToolbarItemConfig: props.updateToolbarItemConfig
      };
      return drawEventParams;
    };

    var containerWidth = props.containerWidth,
        imageObj = props.imageObj;
    var imageNatureWidth = imageObj.naturalWidth;
    var imageNatureHeight = imageObj.naturalHeight;
    var wRatio = containerWidth / imageNatureWidth;
    var hRatio = props.height / imageNatureHeight;
    var scaleRatio = Math.min(wRatio, hRatio, 1);
    _this.canvasWidth = Math.round(imageNatureWidth * scaleRatio);
    _this.canvasHeight = Math.round(imageNatureHeight * scaleRatio);
    _this.pixelRatio = 1 / scaleRatio;
    _konva["default"].pixelRatio = _this.pixelRatio;
    _this.pubSub = new _PubSub["default"](_this.containerId);

    _this.subHistoryStack();

    return _this;
  }

  _createClass(Palette, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
      var currentPlugin = this.props.currentPlugin;

      if (currentPlugin && currentPlugin.onEnter) {
        currentPlugin.onEnter(this.getDrawEventParams(null));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevCurrentPlugin = prevProps.currentPlugin;
      var currentPlugin = this.props.currentPlugin; // 撤销等操作，点击后会再自动清除当前插件

      if (currentPlugin !== prevCurrentPlugin) {
        if (currentPlugin) {
          this.bindEvents();

          if (currentPlugin.onEnter) {
            currentPlugin.onEnter(this.getDrawEventParams(null));
          }
        }

        if (prevCurrentPlugin && prevCurrentPlugin.onLeave) {
          prevCurrentPlugin.onLeave(this.getDrawEventParams(null));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var currentPlugin = this.props.currentPlugin;
      currentPlugin && currentPlugin.onLeave && currentPlugin.onLeave(this.getDrawEventParams(null));
    }
  }, {
    key: "render",
    value: function render() {
      var height = this.props.height;
      var containerWidth = this.context.containerWidth;
      var style = {
        width: containerWidth,
        height: height
      };
      return _react["default"].createElement("div", {
        className: "".concat(_constants.prefixCls, "-palette"),
        style: style
      }, _react["default"].createElement("div", {
        id: this.containerId,
        className: "".concat(_constants.prefixCls, "-container")
      }));
    }
  }]);

  return Palette;
}(_react["default"].Component);

var _default = (0, _EditorContext.withEditorContext)(Palette);

exports["default"] = _default;