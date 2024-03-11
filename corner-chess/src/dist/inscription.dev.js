"use strict";

var _vue = require("vue");

var _Inscription = _interopRequireDefault(require("./Inscription.vue"));

require("bootstrap/dist/js/bootstrap.bundle.min.js");

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _vue.createApp)(_Inscription["default"]).use(_router["default"]).mount('#app');