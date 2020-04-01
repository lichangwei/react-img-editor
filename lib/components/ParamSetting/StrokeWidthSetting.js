"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = StrokeWidthSetting;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function StrokeWidthSetting(props) {
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("span", {
    className: "".concat(_constants.prefixCls, "-stroke-circle ").concat(_constants.prefixCls, "-stroke-circle-small\n          ").concat(props.value === 2 ? _constants.prefixCls + '-stroke-circle-activated' : ''),
    onClick: function onClick() {
      return props.onChange(2);
    }
  }), _react["default"].createElement("span", {
    className: "".concat(_constants.prefixCls, "-stroke-circle ").concat(_constants.prefixCls, "-stroke-circle-medium\n          ").concat(props.value === 6 ? _constants.prefixCls + '-stroke-circle-activated' : ''),
    onClick: function onClick() {
      return props.onChange(6);
    }
  }), _react["default"].createElement("span", {
    className: "".concat(_constants.prefixCls, "-stroke-circle ").concat(_constants.prefixCls, "-stroke-circle-large\n          ").concat(props.value === 8 ? _constants.prefixCls + '-stroke-circle-activated' : ''),
    onClick: function onClick() {
      return props.onChange(8);
    }
  }));
}