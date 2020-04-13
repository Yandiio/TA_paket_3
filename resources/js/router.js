import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import store from './store.js'

import IndexOutlet from './pages/outlets/Index.vue'
import DataOutlet from './pages/outlets/Outlet.vue'
import AddOutlet from './pages/outlets/Add.vue'
import EditOutlet from './pages/outlets/Edit.vue'


Vue.use(Router)


const router = new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'home',
            component : Home,
            meta: {requiresAuth: true}
        },
        {
            path: '/login',
            name: 'login',
            component : Login
        },
        {
            path: '/outlet',
            component: IndexOutlet,
            children: [
                {
                    path: '',
                    name: 'outlet.data',
                    component: DataOutlet,
                    meta : { title: 'Manage Outlets' }
                },
                {
                    path: 'add',
                    name: 'outlet.add',
                    component :AddOutlet,
                    meta : { title: 'Add New Outlet' }
                },
                {
                    path: 'edit/:id',
                    name: 'outlet.edit',
                    component : EditOutlet,
                    meta :{ title : 'Edit Outlet'}
                }
            ]
        }
    ]
});


router.beforeEach((to,from,next) =>{
    store.commit('CLEAR_ERRORS')
    if(to.matched.some(record => record.meta.requiresAuth)){
        let auth = store.getters.isAuth
        if(!auth){
            next({name : 'login'})
        }else{
            next()
        }
    }else{
        next()
    }
})

export default router