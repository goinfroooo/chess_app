"use strict";

var _vue = require("vue");

var _pinia = require("pinia");

var _App = _interopRequireDefault(require("./App.vue"));

require("bootstrap/dist/js/bootstrap.bundle.min.js");

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _vue.createApp)(_App["default"]);
app.use(_router["default"]);
app.use((0, _pinia.createPinia)());
app.mount('#app');