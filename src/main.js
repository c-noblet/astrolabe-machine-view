import Vue from 'vue'
import './scss/main.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
