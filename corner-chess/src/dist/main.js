"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var pinia_1 = require("pinia");
var App_vue_1 = require("./App.vue");
require("bootstrap/dist/js/bootstrap.bundle.min.js");
var router_1 = require("../router");
var app = vue_1.createApp(App_vue_1["default"]);
app.use(router_1["default"]);
app.use(pinia_1.createPinia());
app.mount('#app');
