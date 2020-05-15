import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'

import global_ from '@/util/Global'
Vue.prototype.GLOBAL = global_
// axios
import axios from "axios";
Vue.prototype.$axios = axios;

// 引入Vant
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
