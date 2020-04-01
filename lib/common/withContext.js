"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

function _default(Context) {
  var shouldRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return true;
  };
  return function (WrappedComponent) {
    var InjectContext = function InjectContext(props) {
      var forwardRef = props.forwardRef,
          rest = __rest(props, ["forwardRef"]);

      return _react["default"].createElement(Context.Consumer, null, function (context) {
        return shouldRender(context) ? _react["default"].createElement(WrappedComponent, _extends({
          ref: forwardRef
        }, rest, context)) : null;
      });
    };

    return _react["default"].forwardRef(function (props, ref) {
      return _react["default"].createElement(InjectContext, _extends({
        forwardRef: ref
      }, props));
    });
  };
}