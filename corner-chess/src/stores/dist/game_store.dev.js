"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameStore = void 0;

var _pinia = require("pinia");

var gameStore = (0, _pinia.defineStore)({
  id: 'game',
  state: function state() {
    return {
      Id: 0,
      Board: 'blabla'
    };
  },
  actions: {
    setId: function setId(id) {
      this.Id = id;
    },
    setBoard: function setBoard(board) {
      this.Board = board;
    }
  }
});
exports.gameStore = gameStore;