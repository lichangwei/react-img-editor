"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ReactImageEditor;

var _PluginFactory = _interopRequireDefault(require("./plugins/PluginFactory"));

var _Palette = _interopRequireDefault(require("./components/Palette"));

var _react = _interopRequireWildcard(require("react"));

var _Toolbar = _interopRequireDefault(require("./components/Toolbar"));

var _EditorContext = require("./components/EditorContext");

var _utils = require("./common/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ReactImageEditor(props) {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      imageObj = _useState2[0],
      setImageObj = _useState2[1];

  _utils.i18n.t = props.t;
  var pluginFactory = new _PluginFactory["default"]();
  var plugins = [].concat(_toConsumableArray(pluginFactory.plugins), _toConsumableArray(props.plugins));
  var defaultPlugin = null;
  var defaultParamValue = {};

  for (var i = 0; i < plugins.length; i++) {
    if (props.defaultPluginName && props.toolbar && plugins[i].name === props.defaultPluginName) {
      defaultPlugin = plugins[i];

      if (defaultPlugin.defaultParamValue) {
        defaultParamValue = defaultPlugin.defaultParamValue;
      }

      break;
    }
  }

  var _useState3 = (0, _react.useState)(defaultPlugin),
      _useState4 = _slicedToArray(_useState3, 2),
      currentPlugin = _useState4[0],
      setCurrentPlugin = _useState4[1];

  var _useState5 = (0, _react.useState)(defaultParamValue),
      _useState6 = _slicedToArray(_useState5, 2),
      paramValue = _useState6[0],
      setParamValue = _useState6[1]; // 生成默认 toolbarItemConfig


  var config = {};
  plugins.map(function (plugin) {
    if (plugin.name === 'repeal') {
      config[plugin.name] = {
        disable: true
      };
    } else {
      config[plugin.name] = {
        disable: false
      };
    }
  });

  var _useState7 = (0, _react.useState)(config),
      _useState8 = _slicedToArray(_useState7, 2),
      toolbarItemConfig = _useState8[0],
      setToolbarItemConfig = _useState8[1];

  (0, _react.useEffect)(function () {
    var image = new Image();

    image.onload = function () {
      setImageObj(image);
    };

    image.crossOrigin = 'anonymous';
    image.src = props.src;
  }, [props.src]);

  function handlePluginChange(plugin) {
    setCurrentPlugin(plugin);
    plugin.defaultParamValue && setParamValue(plugin.defaultParamValue);

    if (!plugin.params) {
      setTimeout(function () {
        setCurrentPlugin(null);
      });
    }
  }

  function handlePluginParamValueChange(value) {
    setParamValue(value);
  }

  function updateToolbarItemConfig(config) {
    setToolbarItemConfig(config);
  }

  var style = _extends({
    width: props.width + 'px',
    height: props.height + 'px'
  }, props.style);

  return _react["default"].createElement(_EditorContext.EditorContext.Provider, {
    value: {
      containerWidth: props.width,
      containerHeight: props.height,
      plugins: plugins,
      toolbar: props.toolbar,
      currentPlugin: currentPlugin,
      paramValue: paramValue,
      handlePluginChange: handlePluginChange,
      handlePluginParamValueChange: handlePluginParamValueChange,
      toolbarItemConfig: toolbarItemConfig,
      updateToolbarItemConfig: updateToolbarItemConfig
    }
  }, _react["default"].createElement("div", {
    className: "react-img-editor",
    style: style
  }, imageObj ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_Palette["default"], {
    height: props.height - 42,
    imageObj: imageObj,
    getStage: props.getStage
  }), _react["default"].createElement(_Toolbar["default"], null)) : null));
}

ReactImageEditor.defaultProps = {
  width: 700,
  height: 500,
  style: {},
  plugins: [],
  toolbar: {
    items: ['pen', 'eraser', 'arrow', 'rect', 'circle', 'mosaic', 'text', '|', 'repeal', 'download', 'crop']
  }
};