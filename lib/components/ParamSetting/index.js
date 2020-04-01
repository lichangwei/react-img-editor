"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ParamSetting;

var _ColorSetting = _interopRequireDefault(require("./ColorSetting"));

var _FontSizeSetting = _interopRequireDefault(require("./FontSizeSetting"));

var _LineTypeSetting = _interopRequireDefault(require("./LineTypeSetting"));

var _react = _interopRequireDefault(require("react"));

var _StrokeWidthSetting = _interopRequireDefault(require("./StrokeWidthSetting"));

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ParamSetting(props) {
  function handleStrokeWidthChange(strokeWidth) {
    props.onChange(_extends(_extends({}, props.paramValue), {
      strokeWidth: strokeWidth
    }));
  }

  function handleLineTypeChange(lineType) {
    props.onChange(_extends(_extends({}, props.paramValue), {
      lineType: lineType
    }));
  }

  function handleColorChange(color) {
    props.onChange(_extends(_extends({}, props.paramValue), {
      color: color
    }));
  }

  function handleFontSizeChange(fontSize) {
    props.onChange(_extends(_extends({}, props.paramValue), {
      fontSize: fontSize
    }));
  }

  function renderParamComponent(paramName) {
    switch (paramName) {
      case 'strokeWidth':
        return _react["default"].createElement(_StrokeWidthSetting["default"], {
          key: "stroke-width-setting",
          value: props.paramValue ? props.paramValue['strokeWidth'] : undefined,
          onChange: handleStrokeWidthChange
        });

      case 'lineType':
        return _react["default"].createElement(_LineTypeSetting["default"], {
          key: "line-type-setting",
          value: props.paramValue ? props.paramValue['lineType'] : undefined,
          onChange: handleLineTypeChange
        });

      case 'color':
        return _react["default"].createElement(_ColorSetting["default"], {
          key: "color-setting",
          value: props.paramValue ? props.paramValue['color'] : undefined,
          onChange: handleColorChange
        });

      case 'fontSize':
        return _react["default"].createElement(_FontSizeSetting["default"], {
          key: "font-size-setting",
          value: props.paramValue ? props.paramValue['fontSize'] : undefined,
          onChange: handleFontSizeChange
        });

      default:
        return null;
    }
  }

  return _react["default"].createElement("div", {
    className: "".concat(_constants.prefixCls, "-param-setting")
  }, props.paramNames.map(function (paramName) {
    return renderParamComponent(paramName);
  }));
}