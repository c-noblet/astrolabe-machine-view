import Vue from 'vue'
import './scss/main.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faEllipsisH, faPaintRoller, faSyncAlt, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const schedule = require('node-schedule');

schedule.scheduleJob('0 0 3 * * *', function(){
  console.log('test')
  document.location.reload(true);
});

library.add(faPlus, faEllipsisH, faPaintRoller, faSyncAlt, faUser, faArrowLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
