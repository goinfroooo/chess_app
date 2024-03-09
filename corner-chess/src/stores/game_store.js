import { defineStore } from 'pinia';

export const gameStore = defineStore({
    id: 'game',
    state: () => ({
      Id: 0,
      Board: 'blabla',
    }),
    actions: {
      setId(id) {
        this.Id = id;
      },
      setBoard(board) {
        this.Board = board;
      },
    },
  });