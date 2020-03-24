import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Veille from '../components/Veille.vue'
import Fullscreen from '../components/Fullscreen.vue'
import ColorForm from '../components/BackgroundModal/ColorForm.vue'
import PicForm from '../components/BackgroundModal/PictureForm.vue'
Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      props: true,
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/picform',
          props: true,
          name: 'PicForm',
          component: PicForm
        },
        {
          path: '/',
          props: true,
          name: 'ColorForm',
          component: ColorForm
        }
      ]
    },
    {
      path: '/veille/',
      props: true,
      name: 'Veille',
      component: Veille
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
