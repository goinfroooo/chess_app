import * as vueRouter from 'vue-router';
import Home from './src/components/board.vue';
import Rules from '/src/components/rules.vue';
import Inscription from './src/components/inscription_form.vue';
import profil from './src/components/profil.vue';

const routes = [
  { path: '/',name:"Home", },
  { path: '/Rules',name:"Rules", component: Rules },
  { path: '/Inscription',name:"Inscription", component: Inscription },
  { path: '/Profil',name:"Profil", component: profil },

];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
});

export default router;
