import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false;

window.axios = axios;
// window.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
window.axios.defaults.baseURL = window.location.host.indexOf('localhost') > -1 ? `http://localhost:5010` : `https://wrflask.dinossauro.dev/`;
// window.axios.defaults.baseURL = `https://wrabf.dinossauro.dev`;


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
