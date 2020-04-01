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

var Text = /*#__PURE__*/function (_Plugin) {
  _inherits(Text, _Plugin);

  var _super = _createSuper(Text);

  function Text() {
    var _this;

    _classCallCheck(this, Text);

    _this = _super.call(this);
    _this.name = 'text';
    _this.iconfont = 'iconfont icon-text';
    _this.title = '插入文字';
    _this.params = ['fontSize', 'color'];
    _this.defaultParamValue = {
      fontSize: 12,
      color: '#F5222D'
    };
    _this.shapeName = 'text';
    _this.transformer = null;
    _this.selectedNode = null;

    _this.removeTextareaBlurModal = function () {
      var textareaBlurModal = document.getElementById('textareaBlurModal');

      if (textareaBlurModal) {
        textareaBlurModal.removeEventListener('click', _this.removeTextareaBlurModal);
        document.body.removeChild(textareaBlurModal);
      }
    }; // 防止 textarea blur 时触发 stage click 事件


    _this.addTextareaBlurModal = function (stage) {
      if (document.getElementById('textareaBlurModal')) return;
      var container = stage.container().getBoundingClientRect();
      var textareaBlurModal = document.createElement('div');
      textareaBlurModal.id = 'textareaBlurModal';
      textareaBlurModal.style.position = 'fixed';
      textareaBlurModal.style.left = container.left + 'px';
      textareaBlurModal.style.top = container.top + 'px';
      textareaBlurModal.style.width = container.width + 'px';
      textareaBlurModal.style.height = container.height + 'px';
      textareaBlurModal.style.zIndex = '999';
      document.body.appendChild(textareaBlurModal);
      textareaBlurModal.addEventListener('click', _this.removeTextareaBlurModal);
    };

    _this.createTextarea = function (stage, drawLayer, transformer, textNode, pubSub) {
      var textarea = document.createElement('textarea');
      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.left = textNode.x() + 'px';
      textarea.style.top = textNode.y() + 'px';
      textarea.style.width = textNode.width() + 20 + 'px';
      textarea.style.height = textNode.height() + 'px';
      textarea.style.lineHeight = String(textNode.lineHeight());
      textarea.style.padding = textNode.padding() + 'px';
      textarea.style.margin = '0px';
      textarea.style.fontSize = textNode.fontSize() + 'px';
      textarea.style.color = textNode.fill();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.resize = 'none';
      textarea.style.zIndex = '1000';
      textarea.style.boxSizing = 'content-box';
      textarea.addEventListener('keyup', function (e) {
        textNode.text(e.target.value);
        drawLayer.draw();
        textarea.style.width = textNode.width() + 20 + 'px';
        textarea.style.height = textNode.height() + 'px';
      });
      textarea.addEventListener('blur', function () {
        if (textarea.value !== '') {
          textNode.text(textarea.value);
          transformer.hide();
          textNode.show();
        } else {
          textNode.destroy();
          transformer.destroy();
        }

        textarea.parentNode.removeChild(textarea);
        drawLayer.draw();

        _this.removeTextareaBlurModal();

        pubSub.pub('PUSH_HISTORY', textNode);
      });
      return textarea;
    };

    _this.enableTransform = function (drawEventParams, node) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer;

      if (!_this.transformer) {
        _this.transformer = new _konva["default"].Transformer(_extends(_extends({}, _constants.transformerStyle), {
          enabledAnchors: [],
          padding: 2
        }));
        drawLayer.add(_this.transformer);

        _this.transformer.attachTo(node);

        node.on('mouseenter', function () {
          stage.container().style.cursor = 'move';
        });
        node.on('mouseleave', function () {
          stage.container().style.cursor = 'text';
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
        stage.container().style.cursor = 'text';

        if (remove) {
          node.hide(); // 使用隐藏节点占位并覆盖堆栈中已有节点

          pubSub.pub('PUSH_HISTORY', node);
          node.remove();
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
      container.style.cursor = 'text';
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
      var event = drawEventParams.event,
          stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer,
          paramValue = drawEventParams.paramValue,
          pubSub = drawEventParams.pubSub;

      if (event.target.name && event.target.name() === 'text') {
        // 之前没有选中节点或者在相同节点之间切换点击
        if (!_this.selectedNode || _this.selectedNode._id !== event.target._id) {
          _this.selectedNode && _this.disableTransform(drawEventParams, _this.selectedNode);

          _this.enableTransform(drawEventParams, event.target);

          _this.selectedNode = event.target;
        }

        return;
      } else if (_this.selectedNode) {
        _this.disableTransform(drawEventParams, _this.selectedNode);

        return;
      }

      var fontSize = paramValue && paramValue.fontSize ? paramValue.fontSize : _this.defaultParamValue.fontSize;
      var color = paramValue && paramValue.color ? paramValue.color : _this.defaultParamValue.color;
      var startPos = stage.getPointerPosition();
      if (!startPos) return;
      var textNode = new _konva["default"].Text({
        id: (0, _utils.uuid)(),
        name: 'text',
        x: startPos.x,
        y: startPos.y - 10,
        fontSize: fontSize,
        fill: color,
        padding: 3,
        lineHeight: 1.1
      });
      textNode.on('dragend', function () {
        pubSub.pub('PUSH_HISTORY', this);
      }); // 由于 konvajs 的文本渲染和浏览器渲染的样式不一致，所以使用 Transformer 的边框来代替 textarea 自身的边框

      var textareaTransformer = new _konva["default"].Transformer({
        node: textNode,
        enabledAnchors: [],
        rotateEnabled: false,
        borderStroke: color
      });
      drawLayer.add(textNode);
      drawLayer.add(textareaTransformer);
      textNode.hide();
      drawLayer.draw();

      var textarea = _this.createTextarea(stage, drawLayer, textareaTransformer, textNode, pubSub);

      stage.container().appendChild(textarea);
      textarea.focus();

      _this.addTextareaBlurModal(stage);

      textNode.on('dblclick dbltap', function (e) {
        // dblclick 前会触发两次 onClick 事件，因此要清楚 onClick 事件里的状态
        _this.disableTransform(drawEventParams, _this.selectedNode);

        e.cancelBubble = true;

        var textarea = _this.createTextarea(stage, drawLayer, textareaTransformer, textNode, pubSub);

        stage.container().appendChild(textarea);
        textarea.focus();
        textNode.hide();
        textareaTransformer.show();
        drawLayer.draw();

        _this.addTextareaBlurModal(stage);
      });
    };

    _this.onLeave = function (drawEventParams) {
      var stage = drawEventParams.stage;
      stage.container().style.cursor = 'default';

      _this.removeTextareaBlurModal();

      _this.disableTransform(drawEventParams, _this.selectedNode);
    };

    _this.onNodeRecreate = function (drawEventParams, node) {
      var pubSub = drawEventParams.pubSub;
      node.on('dragend', function () {
        pubSub.pub('PUSH_HISTORY', this);
      });
    };

    _this.title = _utils.i18n.t("image.editor.plugin.".concat(_this.name));
    return _this;
  }

  return Text;
}(_Plugin2["default"]);

exports["default"] = Text;