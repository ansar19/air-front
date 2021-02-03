import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import CalculationsList from '@/views/CalculationsList';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/calculations',
      name: 'calculations',
      component: CalculationsList
    },
    {
      path: '/calc-add',
      name: 'calc-add',
      component: () => import('./components/calculations/CalcAdd.vue')
    },
  ],
});
