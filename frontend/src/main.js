import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VeeValidate from 'vee-validate'


<<<<<<< HEAD



import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vuetify from './plugins/vuetify';

=======
>>>>>>> parent of ca0925e... import de vue-material
require ('./assets/style.css')


Vue.config.productionTip = false

Vue.use(VeeValidate)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
