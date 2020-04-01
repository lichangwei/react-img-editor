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

var toolbarWidth = 275;
var toolbarHeight = 40;

var Crop = /*#__PURE__*/function (_Plugin) {
  _inherits(Crop, _Plugin);

  var _super = _createSuper(Crop);

  function Crop() {
    var _this;

    _classCallCheck(this, Crop);

    _this = _super.call(this);
    _this.name = 'crop';
    _this.iconfont = 'iconfont icon-cut';
    _this.title = '图片裁剪';
    _this.params = [];
    _this.isPaint = false;
    _this.virtualLayer = null;
    _this.rect = null;
    _this.transformer = null;
    _this.toolbarId = 'react-img-editor-crop-toolbar' + (0, _utils.uuid)(); // 一直为正数

    _this.getRectWidth = function () {
      return _this.rect ? _this.rect.getClientRect({
        skipTransform: false
      }).width : 0;
    }; // 一直为正数


    _this.getRectHeight = function () {
      return _this.rect ? _this.rect.getClientRect({
        skipTransform: false
      }).height : 0;
    };

    _this.getRectX = function () {
      return _this.rect ? _this.rect.getClientRect({
        skipTransform: false
      }).x : 0;
    };

    _this.getRectY = function () {
      return _this.rect ? _this.rect.getClientRect({
        skipTransform: false
      }).y : 0;
    };

    _this.adjustToolbarPosition = function (stage) {
      // 需要考虑宽和高为负数的情况
      var $toolbar = document.getElementById(_this.toolbarId);
      if (!$toolbar) return;
      var left;
      var top;

      if (_this.getRectWidth() >= 0) {
        left = _this.getRectX();
      } else {
        left = _this.getRectX() - toolbarWidth;
      }

      if (_this.getRectHeight() >= 0) {
        top = _this.getRectHeight() + _this.getRectY() + 20;
      } else {
        top = _this.getRectY() + 20;
      }

      if (left < 0) left = 0;
      if (left > stage.width() - toolbarWidth) left = stage.width() - toolbarWidth;
      if (top < 0) top = 0;
      if (top > stage.height()) top = stage.height();
      $toolbar.style.left = "".concat(left, "px");
      $toolbar.style.top = "".concat(top, "px");
    };

    _this.createCropToolbar = function (stage, sureBtnEvent, cancelBtnEvent) {
      if (document.getElementById(_this.toolbarId)) return;
      var fragment = new DocumentFragment(); // 创建截图工具栏

      var $cropToolbar = document.createElement('div');
      $cropToolbar.setAttribute('id', _this.toolbarId);
      var cropToolbarStyle = 'position: absolute; z-index: 1000; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);' + "background: #FFF; width: ".concat(toolbarWidth, "px; height: ").concat(toolbarHeight, "px; display: flex; align-items: center; padding: 0 12px;") + 'font-size: 14px;';
      $cropToolbar.setAttribute('style', cropToolbarStyle);
      fragment.appendChild($cropToolbar); // 创建文本

      var $textNode = document.createTextNode(_utils.i18n.t('image.editor.plugin.crop.drag'));
      $cropToolbar.appendChild($textNode);
      var btnStyle = 'display: inline-block; width: 32px; height: 24px; border: 1px solid #C9C9D0;' + 'border-radius: 2px; text-align: center; cursor: pointer; line-height: 24px;'; // 创建取消按钮

      var $cancelBtn = document.createElement('span');
      $cancelBtn.setAttribute('style', btnStyle + 'background: #FFF; margin: 0 8px 0 10px;');
      $cancelBtn.onclick = cancelBtnEvent;
      $cropToolbar.appendChild($cancelBtn); // 创建取消按钮图标

      var $closeIcon = document.createElement('i');
      $closeIcon.setAttribute('class', 'iconfont icon-close');
      $closeIcon.setAttribute('style', 'font-size: 12px;');
      $cancelBtn.appendChild($closeIcon); // 创建确认按钮

      var $sureBtn = document.createElement('span');
      $sureBtn.setAttribute('style', btnStyle + 'background: #007AFF; color: #FFF;');
      $sureBtn.onclick = sureBtnEvent;
      $cropToolbar.appendChild($sureBtn); // 创建确认按钮图标

      var $checkIcon = document.createElement('i');
      $checkIcon.setAttribute('class', 'iconfont icon-check');
      $checkIcon.setAttribute('style', 'font-size: 12px;');
      $sureBtn.appendChild($checkIcon);
      stage.container().appendChild(fragment);
    };

    _this.reset = function (stage) {
      var $toolbar = document.getElementById(_this.toolbarId);
      $toolbar && stage.container().removeChild($toolbar);
      _this.virtualLayer && _this.virtualLayer.remove();

      if (_this.rect) {
        _this.rect.off('mouseenter');

        _this.rect.off('mouseleave');
      }
    };

    _this.onEnter = function (drawEventParams) {
      var stage = drawEventParams.stage;
      stage.container().style.cursor = 'crosshair';
    };

    _this.onDrawStart = function (drawEventParams) {
      var stage = drawEventParams.stage;
      var startPos = stage.getPointerPosition(); // 当鼠标移出 stage 时，不会触发 mouseup，重新回到 stage 时，会重新触发 onDrawStart，这里就是为了防止重新触发 onDrawStart

      if (_this.isPaint || !startPos) return;
      if (document.getElementById(_this.toolbarId)) return;
      _this.isPaint = true;
      _this.virtualLayer = new _konva["default"].Layer();
      stage.add(_this.virtualLayer);

      _this.virtualLayer.setZIndex(2); // 绘制透明黑色遮罩


      var maskRect = new _konva["default"].Rect({
        globalCompositeOperation: 'source-over',
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: 'rgba(0, 0, 0, .6)'
      });

      _this.virtualLayer.add(maskRect);

      _this.rect = new _konva["default"].Rect({
        x: startPos.x,
        y: startPos.y,
        fill: '#FFF',
        draggable: true,
        globalCompositeOperation: 'destination-out'
      });

      _this.rect.on('mouseenter', function () {
        stage.container().style.cursor = 'move';
      });

      _this.rect.on('mouseleave', function () {
        stage.container().style.cursor = 'default';
      });

      _this.virtualLayer.add(_this.rect);

      _this.virtualLayer.draw();
    };

    _this.onDraw = function (drawEventParams) {
      var stage = drawEventParams.stage;
      var endPos = stage.getPointerPosition();
      if (!_this.isPaint || !endPos) return;
      if (document.getElementById(_this.toolbarId)) return; // 绘制初始裁剪区域

      _this.rect.width(endPos.x - _this.getRectX());

      _this.rect.height(endPos.y - _this.getRectY());

      _this.rect.dragBoundFunc(function (pos) {
        var x = pos.x;
        var y = pos.y;

        if (_this.transformer.width() >= 0) {
          if (pos.x <= 0) x = 0;
          if (pos.x >= stage.width() - _this.transformer.width()) x = stage.width() - _this.transformer.width();
        } else {
          if (pos.x >= stage.width()) x = stage.width();
          if (pos.x <= -_this.transformer.width()) x = -_this.transformer.width();
        }

        if (_this.transformer.height() >= 0) {
          if (pos.y <= 0) y = 0;
          if (pos.y >= stage.height() - _this.transformer.height()) y = stage.height() - _this.transformer.height();
        } else {
          if (pos.y >= stage.height()) y = stage.height();
          if (pos.y <= -_this.transformer.height()) y = -_this.transformer.height();
        }

        _this.adjustToolbarPosition(stage);

        return {
          x: x,
          y: y
        };
      });

      _this.virtualLayer.draw();
    };

    _this.onDrawEnd = function (drawEventParams) {
      var stage = drawEventParams.stage,
          pixelRatio = drawEventParams.pixelRatio,
          reload = drawEventParams.reload;

      if (!_this.isPaint) {
        _this.isPaint = false;
        return;
      }

      _this.isPaint = false; // 允许改变裁剪区域

      _this.transformer = new _konva["default"].Transformer(_extends(_extends({
        node: _this.rect
      }, _constants.transformerStyle), {
        boundBoxFunc: function boundBoxFunc(oldBox, newBox) {
          var x = newBox.x;
          var y = newBox.y;
          var width = newBox.width;
          var height = newBox.height;

          if (newBox.width >= 0) {
            if (newBox.x <= 0) {
              x = 0;
              width = newBox.width + newBox.x;
            }

            if (newBox.x >= stage.width() - newBox.width) {
              width = stage.width() - oldBox.x;
            }
          } else {
            if (newBox.x >= stage.width()) {
              x = stage.width();
              width = newBox.width + (newBox.x - stage.width());
            }

            if (newBox.x <= -newBox.width) {
              width = -oldBox.x;
            }
          }

          if (newBox.height >= 0) {
            if (newBox.y <= 0) {
              y = 0;
              height = newBox.height + newBox.y;
            }

            if (newBox.y >= stage.height() - newBox.height) {
              height = stage.height() - oldBox.y;
            }
          } else {
            if (newBox.y >= stage.height()) {
              y = stage.height();
              height = newBox.height + (newBox.y - stage.height());
            }

            if (newBox.y <= -newBox.height) {
              height = -oldBox.y;
            }
          }

          _this.adjustToolbarPosition(stage);

          return {
            x: x,
            y: y,
            width: width,
            height: height
          };
        }
      }));

      _this.virtualLayer.add(_this.transformer);

      _this.virtualLayer.draw();

      _this.createCropToolbar(stage, function () {
        // 裁剪区域太小不允许裁剪
        if (_this.getRectWidth() < 2 || _this.getRectHeight() < 2) return; // 提前清除拉伸框

        _this.virtualLayer.remove(_this.transformer);

        var dataURL = stage.toDataURL({
          x: _this.getRectX(),
          y: _this.getRectY(),
          width: _this.getRectWidth(),
          height: _this.getRectHeight(),
          pixelRatio: pixelRatio,
          mimeType: 'image/jpeg'
        });
        var imageObj = new Image();

        imageObj.onload = function () {
          reload(imageObj, _this.getRectWidth(), _this.getRectHeight());

          _this.reset(stage);
        };

        imageObj.src = dataURL;
        stage.container().style.cursor = 'crosshair';
      }, function () {
        _this.reset(stage);

        stage.container().style.cursor = 'crosshair';
      });

      _this.adjustToolbarPosition(stage);
    };

    _this.onLeave = function (drawEventParams) {
      var stage = drawEventParams.stage;

      _this.reset(stage);

      stage.container().style.cursor = 'default';
      _this.isPaint = false;
    };

    _this.title = _utils.i18n.t("image.editor.plugin.".concat(_this.name));
    return _this;
  }

  return Crop;
}(_Plugin2["default"]);

exports["default"] = Crop;