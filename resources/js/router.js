import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import store from './store.js'

import IndexOutlet from './pages/outlets/Index.vue'
import DataOutlet from './pages/outlets/Outlet.vue'
import AddOutlet from './pages/outlets/Add.vue'
import EditOutlet from './pages/outlets/Edit.vue'

import IndexCourier from './pages/couriers/Index.vue'
import DataCouriers from './pages/couriers/Courier.vue'
import AddCouriers from './pages/couriers/Add.vue'
import EditCouriers from './pages/couriers/Edit.vue'

import IndexCustomer from './pages/customers/Index.vue'
import DataCustomer from './pages/customers/Customer.vue'
import AddCustomer from './pages/customers/Add.vue'
import EditCustomer from './pages/customers/Edit.vue'

import IndexTransaction from './pages/transaction/Index.vue'
import AddTransaction from './pages/transaction/Add.vue'
import ViewTransaction from './pages/transaction/View.vue'
import ListTransaction from './pages/transaction/List.vue'




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
            path: '/outlets',
            component: IndexOutlet,
            children: [
                {
                    path: '',
                    name: 'outlets.data',
                    component: DataOutlet,
                    meta : { title: 'Manage Outlets' }
                },
                {
                    path: 'add',
                    name: 'outlets.add',
                    component :AddOutlet,
                    meta : { title: 'Add New Outlet' }
                },
                {
                    path: 'edit/:id',
                    name: 'outlets.edit',
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