import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [
    {
      path: '/test/',
      props: true,
      name: 'Home',
      component: Home
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
  
})
