import * as vueRouter from 'vue-router';
import Test from './src/components/test.vue';
import Game from './src/components/board.vue';
import Rules from '/src/components/rules.vue';
import Inscription from './src/components/inscription_form.vue';
import Profil from './src/components/profil.vue';
import Game_list from './src/components/game_list.vue';

const routes = [
  { path: '/',name:"Home", component: {template: '<div></div>'}},
  { path: '/Rules',name:"Rules", component: Rules },
  { path: '/Profil',name:"Profil", component: Profil },
  { path: '/Inscription',name:"Inscription", component: Inscription },
  { path: '/game_list',name:"game_list", component: Game_list },
  { path: '/game',name:"game", component: Game },
  { path: '/test',name:"test", component: Test },
  

];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
});

export default router;
