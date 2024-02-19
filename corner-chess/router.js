import * as vueRouter from 'vue-router';
import Home from './src/components/board.vue';
import Rules from '/src/components/rules_list.vue';
import Inscription from './src/components/inscription_form.vue';


const routes = [
  { path: '/',name:"Home", component: Home },
  { path: '/Rules',name:"Rules", component: Rules },
  { path: '/Inscription',name:"Inscription", component: Inscription },

];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
});

export default router;
