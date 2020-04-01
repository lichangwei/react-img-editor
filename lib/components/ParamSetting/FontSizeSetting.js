"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FontSizeSetting;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../common/constants");

var _utils = require("../../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function FontSizeSetting(props) {
  return _react["default"].createElement("span", {
    style: {
      margin: '0 8px'
    }
  }, _react["default"].createElement("button", {
    className: "".concat(_constants.prefixCls, "-font-size ").concat(props.value === 12 ? _constants.prefixCls + '-font-size-activated' : ''),
    onClick: function onClick() {
      return props.onChange(12);
    }
  }, _utils.i18n.t('image.editor.font.size.small')), _react["default"].createElement("button", {
    className: "".concat(_constants.prefixCls, "-font-size ").concat(props.value === 16 ? _constants.prefixCls + '-font-size-activated' : ''),
    onClick: function onClick() {
      return props.onChange(16);
    }
  }, _utils.i18n.t('image.editor.font.size.medium')), _react["default"].createElement("button", {
    className: "".concat(_constants.prefixCls, "-font-size ").concat(props.value === 20 ? _constants.prefixCls + '-font-size-activated' : ''),
    onClick: function onClick() {
      return props.onChange(20);
    }
  }, _utils.i18n.t('image.editor.font.size.big')));
}