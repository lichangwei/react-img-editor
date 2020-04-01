"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ColorSetting;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var colors = ['#F5222D', '#FFEB00', '#00B4FF', '#52C51A ', '#19191A', '#FFFFFF'];

function ColorSetting(props) {
  return _react["default"].createElement("span", {
    style: {
      margin: '0 8px',
      fontSize: 0
    }
  }, colors.map(function (color) {
    return _react["default"].createElement("span", {
      key: color,
      className: "".concat(_constants.prefixCls, "-color-square ").concat(props.value === color ? _constants.prefixCls + '-color-square-activated' : ''),
      style: {
        backgroundColor: color
      },
      onClick: function onClick() {
        return props.onChange(color);
      }
    });
  }));
}