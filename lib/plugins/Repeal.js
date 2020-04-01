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

var Repeal = /*#__PURE__*/function (_Plugin) {
  _inherits(Repeal, _Plugin);

  var _super = _createSuper(Repeal);

  function Repeal() {
    var _this;

    _classCallCheck(this, Repeal);

    _this = _super.call(this);
    _this.name = 'repeal';
    _this.iconfont = 'iconfont icon-repeal';
    _this.title = '撤销';

    _this.onEnter = function (drawEventParams) {
      var drawLayer = drawEventParams.drawLayer,
          historyStack = drawEventParams.historyStack,
          plugins = drawEventParams.plugins,
          pubSub = drawEventParams.pubSub;
      drawLayer.removeChildren();
      historyStack.pop();
      pubSub.pub('POP_HISTORY', historyStack);
      historyStack.forEach(function (node, index) {
        var flag = false;

        for (var i = index + 1; i < historyStack.length; i++) {
          if (historyStack[i].attrs.id === node.attrs.id) {
            flag = true;
            break;
          }
        }

        if (!flag) {
          var recreatedNode = _konva["default"].Node.create(node);

          drawLayer.add(recreatedNode);
          setTimeout(function () {
            for (var _i = 0; _i < plugins.length; _i++) {
              if (plugins[_i].shapeName && plugins[_i].shapeName === recreatedNode.name()) {
                plugins[_i].onNodeRecreate && plugins[_i].onNodeRecreate(drawEventParams, recreatedNode);
                break;
              }
            }
          });
        }
      });
      drawLayer.draw();
    };

    _this.title = _utils.i18n.t("image.editor.plugin.".concat(_this.name));
    return _this;
  }

  return Repeal;
}(_Plugin2["default"]);

exports["default"] = Repeal;