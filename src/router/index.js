import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Veille from '../components/Veille.vue'
import Fullscreen from '../components/Fullscreen.vue'
import EditColor from '../components/modal/EditColor.vue'
import EditPicture from '../components/modal/EditPicture.vue'
import AddWindow from '../components/modal/AddWindow.vue'
import YoutubeWindow from '../components/modal/YoutubeWindow.vue'
import EditWindow from '../components/modal/EditWindow.vue'
import EditVeille from '../components/modal/EditVeille.vue'
import User from '../components/modal/User.vue'
Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/edit',
      redirect: '/edit/home'
    },
    {
      path: '/home',
      props: true,
      name: 'Home',
      component: Home,
    },
    {
      path: '/fullscreen',
      props: true,
      name: 'Fullscreen',
      component: Fullscreen
    },
    {
      path: '/veille',
      props: true,
      name: 'Veille',
      component: Veille
    },
    {
      path: '/edit/home',
      props: true,
      name: 'EditHome',
      component: Home,
      children: [
        {
          path: '/edit/home/modal/edit-picture',
          props: true,
          name: 'EditPicture',
          component: EditPicture
        },
        {
          path: '/edit/home/modal/edit-color',
          props: true,
          name: 'EditColor',
          component: EditColor
        },
        {
          path: '/edit/home/modal/add-window',
          props: true,
          name: 'AddWindow',
          component: AddWindow
        },
        {
          path: '/edit/home/modal/add-yt-window',
          props: true,
          name: 'YoutubeWindow',
          component: YoutubeWindow
        },
        {
          path: '/edit/home/modal/edit-window',
          props: true,
          name: 'EditWindow',
          component: EditWindow
        },
        {
          path: '/edit/home/modal/edit-tempsV',
          props: true,
          name: 'EditVeille',
          component: EditVeille
        },
        {
          path: '/edit/home/modal/user',
          props: true,
          name: 'User',
          component: User
        }
      ]
    },
    {
      path: '/edit/veille',
      props: true,
      name: 'EditVeille',
      component: Veille,
      children: [
        {
          path: '/edit/veille/modal/edit-picture',
          props: true,
          name: 'EditPictureVeille',
          component: EditPicture
        },
        {
          path: '/edit/veille/modal/edit-color',
          props: true,
          name: 'EditColorVeille',
          component: EditColor
        },
        {
          path: '/edit/veille/modal/add-window',
          props: true,
          name: 'AddWindowVeille',
          component: AddWindow
        },
        {
          path: '/edit/veille/modal/edit-window',
          props: true,
          name: 'EditWindowVeille',
          component: EditWindow
        },
        {
          path: '/edit/veille/modal/edit-tempsV',
          props: true,
          name: 'EditVeille',
          component: EditVeille
        },
        {
          path: '/edit/veille/modal/user',
          props: true,
          name: 'User',
          component: User
        }
      ]
    },
    {
      path: '/edit/fullscreen',
      props: true,
      name: 'EditFullscreen',
      component: Fullscreen
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
  
})
