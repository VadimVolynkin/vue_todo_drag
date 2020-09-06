import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueDraggable from "vue-draggable";
// import VueFeatherIcon from "vue-feather-icon";

Vue.config.productionTip = false

Vue.use(VueDraggable);
// Vue.use(VueFeatherIcon);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
