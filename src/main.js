import Vue from 'vue'
import './scss/main.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faEllipsisH, faPaintRoller, faSyncAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { CronJob } from 'cron';

const job = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
job.start();

library.add(faPlus, faEllipsisH, faPaintRoller, faSyncAlt, faUser)
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
