// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router' 
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

require ('./assets/css/vendors/perfect-scrollbar.min.css')
require ('./assets/css/app.css')
require ('./assets/css/vendors/sweetalert2.min.css')
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSession from 'vue-session'
Vue.use(VueSession)
Vue.use(BootstrapVue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})