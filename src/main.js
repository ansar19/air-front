/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex'
import ShardsVue from 'shards-vue';

import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTable)



// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';
import 'vue-select/dist/vue-select.css';
import '@/assets/scss/meta-table.scss';

// Core
import App from './App.vue';
import router from './router';
import store from './store'

import vSelect from 'vue-select';

Vue.use(vSelect)
// Layouts
import Default from '@/layouts/Default.vue';


Vue.use(Vuex);

ShardsVue.install(Vue);

Vue.component('default-layout', Default);
Vue.component('v-select', vSelect);

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
}

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
