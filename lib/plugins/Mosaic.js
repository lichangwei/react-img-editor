"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _konva = _interopRequireDefault(require("konva"));

var _Plugin2 = _interopRequireDefault(require("./Plugin"));

var _utils = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var tileHeight = 5;
var tileWidth = 5;

var Mosaic = /*#__PURE__*/function (_Plugin) {
  _inherits(Mosaic, _Plugin);

  var _super = _createSuper(Mosaic);

  function Mosaic() {
    var _this;

    _classCallCheck(this, Mosaic);

    _this = _super.call(this);
    _this.name = 'mosaic';
    _this.iconfont = 'iconfont icon-mosaic';
    _this.title = '马赛克';
    _this.params = ['strokeWidth'];
    _this.defaultParamValue = {
      strokeWidth: 2
    };
    _this.isPaint = false;
    _this.tiles = [];
    _this.tileRowSize = 0;
    _this.tileColumnSize = 0;
    _this.width = 0;
    _this.height = 0;
    _this.rectGroup = null;

    _this.drawTile = function (tiles, drawLayer) {
      tiles = [].concat(tiles);
      tiles.forEach(function (tile) {
        if (tile.isFilled) {
          return;
        }

        if (!tile.color) {
          var dataLen = tile.data.length;
          var r = 0,
              g = 0,
              b = 0,
              a = 0;

          for (var i = 0; i < dataLen; i += 4) {
            r += tile.data[i];
            g += tile.data[i + 1];
            b += tile.data[i + 2];
            a += tile.data[i + 3];
          } // Set tile color.


          var pixelLen = dataLen / 4;
          tile.color = {
            r: Math.round(r / pixelLen),
            g: Math.round(g / pixelLen),
            b: Math.round(b / pixelLen),
            a: Math.round(a / pixelLen)
          };
        }

        var color = tile.color;
        var x = tile.column * tileWidth;
        var y = tile.row * tileHeight;
        var w = tile.pixelWidth;
        var h = tile.pixelHeight;
        var rect = new _konva["default"].Rect({
          globalCompositeOperation: 'source-over',
          x: x,
          y: y,
          width: w,
          height: h,
          fill: "rgba(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ", ").concat(color.a / 255, ")")
        });

        _this.rectGroup.add(rect);

        tile.isFilled = true;
      });
      drawLayer.add(_this.rectGroup);
      drawLayer.draw();
    };

    _this.getTilesByPoint = function (x, y, strokeWidth) {
      var ts = [];
      var startRow = Math.max(0, Math.floor(y / tileHeight) - Math.floor(strokeWidth / 2));
      var startColumn = Math.max(0, Math.floor(x / tileWidth) - Math.floor(strokeWidth / 2));
      var endRow = Math.min(_this.tileRowSize, startRow + strokeWidth);
      var endColumn = Math.min(_this.tileColumnSize, startColumn + strokeWidth);

      while (startRow < endRow) {
        var column = startColumn;

        while (column < endColumn) {
          ts.push(_this.tiles[startRow * _this.tileColumnSize + column]);
          column += 1;
        }

        startRow += 1;
      }

      return ts;
    };

    _this.onDrawStart = function (drawEventParams) {
      var stage = drawEventParams.stage,
          imageData = drawEventParams.imageData;
      _this.tiles = [];
      _this.width = stage.width();
      _this.height = stage.height();
      _this.tileRowSize = Math.ceil(_this.height / tileHeight);
      _this.tileColumnSize = Math.ceil(_this.width / tileWidth);
      _this.rectGroup = new _konva["default"].Group({
        id: (0, _utils.uuid)()
      }); // 将图片切分成一个个大一点的贴片

      for (var i = 0; i < _this.tileRowSize; i++) {
        for (var j = 0; j < _this.tileColumnSize; j++) {
          var tile = {
            row: i,
            column: j,
            pixelWidth: tileWidth,
            pixelHeight: tileHeight,
            data: []
          };
          var data = []; // 转换为像素图形下，起始像素位置

          var pixelPosition = (_this.width * tileHeight * tile.row + tile.column * tileWidth) * 4; // 转换为像素图形下，包含多少行

          var pixelRowAmount = tile.pixelHeight; // 计算，转换为像素图形使，一个贴片所包含的所有像素数据。先遍历贴片范围内的每一列，每一列中再单独统计行的像素数量

          for (var _i = 0; _i < pixelRowAmount; _i++) {
            // 当前列的起始像素位置
            var position = pixelPosition + _this.width * 4 * _i; // 贴片范围内一行的像素数据，等于贴片宽度 * 4

            data = [].concat(_toConsumableArray(data), _toConsumableArray(imageData.data.slice(position, position + tile.pixelWidth * 4)));
          }

          tile.data = data;

          _this.tiles.push(tile);
        }
      }

      _this.isPaint = true;
    };

    _this.onDraw = function (drawEventParams) {
      var stage = drawEventParams.stage,
          drawLayer = drawEventParams.drawLayer,
          paramValue = drawEventParams.paramValue;
      var pos = stage.getPointerPosition();
      if (!_this.isPaint || !pos) return;
      var strokeWidth = paramValue && paramValue.strokeWidth ? paramValue.strokeWidth : _this.defaultParamValue.strokeWidth;

      _this.drawTile(_this.getTilesByPoint(pos.x, pos.y, strokeWidth), drawLayer);
    };

    _this.onDrawEnd = function (drawEventParams) {
      var pubSub = drawEventParams.pubSub;
      _this.isPaint = false;
      pubSub.pub('PUSH_HISTORY', _this.rectGroup);
    };

    _this.onLeave = function () {
      _this.isPaint = false;
    };

    _this.title = _utils.i18n.t("image.editor.plugin.".concat(_this.name));
    return _this;
  }

  return Mosaic;
}(_Plugin2["default"]);

exports["default"] = Mosaic;