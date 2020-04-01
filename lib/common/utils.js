"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = uuid;
exports.i18n = void 0;

function uuid() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

var i18n = {
  t: function t(key) {
    return '';
  }
};
exports.i18n = i18n;