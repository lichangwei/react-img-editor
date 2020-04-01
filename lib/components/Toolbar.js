"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Toolbar;

var _ParamSetting = _interopRequireDefault(require("./ParamSetting"));

var _react = _interopRequireWildcard(require("react"));

var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));

var _constants = require("../common/constants");

var _EditorContext = require("./EditorContext");

require("rc-tooltip/assets/bootstrap_white.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Toolbar() {
  var _useContext = (0, _react.useContext)(_EditorContext.EditorContext),
      containerWidth = _useContext.containerWidth,
      plugins = _useContext.plugins,
      toolbar = _useContext.toolbar,
      currentPlugin = _useContext.currentPlugin,
      paramValue = _useContext.paramValue,
      handlePluginChange = _useContext.handlePluginChange,
      handlePluginParamValueChange = _useContext.handlePluginParamValueChange,
      toolbarItemConfig = _useContext.toolbarItemConfig;

  var style = {
    width: containerWidth
  };

  function renderPlugin(plugin) {
    var isActivated = !!(currentPlugin && currentPlugin.name === plugin.name);
    var paramNames = currentPlugin ? currentPlugin.params : [];
    var isDisabled = toolbarItemConfig[plugin.name].disable;

    if (!paramNames || paramNames.length === 0) {
      return _react["default"].createElement("span", {
        key: plugin.name,
        className: "".concat(_constants.prefixCls, "-toolbar-icon ").concat(isActivated ? 'activated' : '', " ").concat(isDisabled ? 'disabled' : '')
      }, _react["default"].createElement("i", {
        title: plugin.title,
        className: plugin.iconfont,
        onClick: function onClick() {
          return handlePluginChange(plugin);
        }
      }));
    }

    return _react["default"].createElement(_rcTooltip["default"], {
      key: plugin.name,
      placement: "bottom",
      overlay: _react["default"].createElement(_ParamSetting["default"], {
        paramNames: paramNames,
        paramValue: paramValue,
        onChange: handlePluginParamValueChange
      }),
      visible: isActivated,
      overlayClassName: "".concat(_constants.prefixCls, "-tooltip"),
      arrowContent: _react["default"].createElement("div", {
        className: "rc-tooltip-arrow-inner"
      })
    }, _react["default"].createElement("span", {
      key: plugin.name,
      className: "".concat(_constants.prefixCls, "-toolbar-icon ").concat(isActivated ? 'activated' : '', " ").concat(isDisabled ? 'disabled' : '')
    }, _react["default"].createElement("i", {
      title: plugin.title,
      className: plugin.iconfont,
      onClick: function onClick() {
        return handlePluginChange(plugin);
      }
    })));
  }

  return _react["default"].createElement("div", {
    className: "".concat(_constants.prefixCls, "-toolbar"),
    style: style
  }, toolbar.items.map(function (item, index) {
    if (item === '|') return _react["default"].createElement("span", {
      key: index,
      className: "".concat(_constants.prefixCls, "-toolbar-separator")
    });

    for (var i = 0; i < plugins.length; i++) {
      if (plugins[i].name === item) {
        return renderPlugin(plugins[i]);
      }
    }

    return null;
  }));
}