"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var vueRouter = _interopRequireWildcard(require("vue-router"));

var _test = _interopRequireDefault(require("./src/components/test.vue"));

var _board = _interopRequireDefault(require("./src/components/board.vue"));

var _rules = _interopRequireDefault(require("/src/components/rules.vue"));

var _inscription_form = _interopRequireDefault(require("./src/components/inscription_form.vue"));

var _profil = _interopRequireDefault(require("./src/components/profil.vue"));

var _game_list = _interopRequireDefault(require("./src/components/game_list.vue"));

var _statistiques = _interopRequireDefault(require("./src/components/statistiques.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: '/',
  name: "Home",
  component: {
    template: '<div></div>'
  }
}, {
  path: '/Rules',
  name: "Rules",
  component: _rules["default"]
}, {
  path: '/Profil',
  name: "Profil",
  component: _profil["default"]
}, {
  path: '/Inscription',
  name: "Inscription",
  component: _inscription_form["default"]
}, {
  path: '/game_list',
  name: "game_list",
  component: _game_list["default"]
}, {
  path: '/game',
  name: "game",
  component: _board["default"]
}, {
  path: '/test',
  name: "test",
  component: _test["default"]
}, {
  path: '/statistiques',
  name: "statistiques",
  component: _statistiques["default"]
}, {
  path: '/sandbox',
  name: "sandbox",
  component: _board["default"]
}];
var router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: routes
});
var _default = router;
exports["default"] = _default;