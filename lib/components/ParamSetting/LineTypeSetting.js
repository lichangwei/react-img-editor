"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LineTypeSetting;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function LineTypeSetting(props) {
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("i", {
    className: "iconfont icon-line2 ".concat(_constants.prefixCls, "-line-type\n          ").concat(props.value === 'solid' ? _constants.prefixCls + '-line-type-activated' : ''),
    onClick: function onClick() {
      return props.onChange('solid');
    }
  }), _react["default"].createElement("i", {
    className: "iconfont icon-dotted-line ".concat(_constants.prefixCls, "-line-type\n          ").concat(props.value === 'dash' ? _constants.prefixCls + '-line-type-activated' : ''),
    onClick: function onClick() {
      return props.onChange('dash');
    }
  }));
}