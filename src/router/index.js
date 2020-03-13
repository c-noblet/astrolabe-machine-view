import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Fullscreen from '../components/Fullscreen.vue'

Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      props: true,
      name: 'Home',
      component: Home
    },
    {
      path: '/fullscreen/',
      props: true,
      name: 'Fullscreen',
      component: Fullscreen
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
  
})
