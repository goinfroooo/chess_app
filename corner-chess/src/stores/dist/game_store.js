"use strict";
exports.__esModule = true;
exports.gameStore = void 0;
var pinia_1 = require("pinia");
exports.gameStore = pinia_1.defineStore({
    id: 'game',
    state: function () { return ({
        Id: 0,
        Board: {},
        IsSandbox: false
    }); },
    actions: {
        setId: function (id) {
            this.Id = id;
        },
        setBoard: function (board) {
            this.Board = board;
        },
        setSandbox: function (isSandbox) {
            this.IsSandbox = isSandbox;
        }
    }
});
