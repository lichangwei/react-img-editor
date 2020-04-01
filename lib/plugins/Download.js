"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var Download = /*#__PURE__*/function (_Plugin) {
  _inherits(Download, _Plugin);

  var _super = _createSuper(Download);

  function Download() {
    var _this;

    _classCallCheck(this, Download);

    _this = _super.call(this);
    _this.name = 'download';
    _this.iconfont = 'iconfont icon-download';
    _this.title = '下载图片';

    _this.onEnter = function (drawEventParams) {
      var stage = drawEventParams.stage,
          pixelRatio = drawEventParams.pixelRatio; // 延迟下载，等触发 plugin 的 onLeave 生命周期，清除未完成的现场

      setTimeout(function () {
        var canvas = stage.toCanvas({
          pixelRatio: pixelRatio
        });
        canvas.toBlob(function (blob) {
          var link = document.createElement('a');
          link.download = '';
          link.href = URL.createObjectURL(blob);
          link.click();
        }, 'image/jpeg');
      }, 100);
    };

    _this.title = _utils.i18n.t("image.editor.plugin.".concat(_this.name));
    return _this;
  }

  return Download;
}(_Plugin2["default"]);

exports["default"] = Download;