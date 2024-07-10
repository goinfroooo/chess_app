import { Game,Board } from '@/script/interface';
import { defineStore } from 'pinia';

export const gameStore = defineStore({
  id: 'game',
  state: () => ({
    Game: {} as Game,
    IsSandbox: false,
  }),
  actions: {
    setGame (game:Game) {
      this.Game = game;
    },
    setIsSandbox(isSandbox: boolean) {
      this.IsSandbox = isSandbox;
    },
  },
});