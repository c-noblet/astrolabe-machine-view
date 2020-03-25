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
    },
    {
      path: '/edit/',
      props: true,
      name: 'EditHome',
      component: Home,
      children: [
        {
          path: '/edit/veille/',
          props: true,
          name: 'EditVeille',
          component: Veille
        },
        {
          path: '/edit/fullscreen/',
          props: true,
          name: 'EditFullscreen',
          component: Fullscreen
        },
        {
          path: '/edit/picform/',
          props: true,
          name: 'EditPicForm',
          component: PicForm
        },
        {
          path: '/edit/',
          props: true,
          name: 'EditColorForm',
          component: ColorForm
        }
      ]
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
  
})
