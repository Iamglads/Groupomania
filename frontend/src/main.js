import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VeeValidate from 'vee-validate'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

require ('./assets/style.css')


Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(VueMaterial)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
