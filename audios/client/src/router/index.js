import Vue from 'vue'
import Router from 'vue-router'
import AppAudio from '@/components/AppAudio'
import AddAudio from '@/components/AddAudios'
import Login from '@/components/Login'
import Author from '@/components/Author'

Vue.use(Router)

export default new Router({

  mode :'history',  
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AppAudio
    },
    {
       path: '/login',
       name: 'Login',
       component: Login
    },
    {
       path: '/addAudio',
       name: 'Audio',
       component: AddAudio,
       //meta: { requiresAuth: true }
    },
    {
      path: '/author',
      name: 'Author',
      component: Author,
      //meta: { requiresAuth: true }
   }

  ]
})