import Vue from 'vue'
import Router from 'vue-router'
import DetailAudio from '@/components/DetailAudio'


Vue.use(Router)

export default new Router({
    routes: [   
        {
            path: '/',
            name: 'AppAudio',
            component: {
                AppAudio,
                AddAudio} 
          },
        ,{
            path: '/detailsAudio/:id',
            name: 'DetailAudio',
            component: DetailAudio
        }
       
    ]
})