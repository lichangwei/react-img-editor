"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withEditorContext = exports.EditorContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _withContext = _interopRequireDefault(require("../common/withContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EditorContext = _react["default"].createContext({});

exports.EditorContext = EditorContext;
var withEditorContext = (0, _withContext["default"])(EditorContext);
exports.withEditorContext = withEditorContext;