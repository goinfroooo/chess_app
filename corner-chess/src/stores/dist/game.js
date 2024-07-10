"use strict";
exports.__esModule = true;
exports.gameStore = void 0;
var pinia_1 = require("pinia");
exports.gameStore = pinia_1.defineStore({
    id: 'game',
    state: function () { return ({
        Game: {},
        IsSandbox: false
    }); },
    actions: {
        setGame: function (game) {
            this.Game = game;
        },
        setIsSandbox: function (isSandbox) {
            this.IsSandbox = isSandbox;
        }
    }
});
