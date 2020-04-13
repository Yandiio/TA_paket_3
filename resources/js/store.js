import Vue from 'vue'
import Vuex from 'vuex'
import outlet from './stores/outlet.js'
import auth from './stores/auth.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    
    modules: {
        auth,
        outlet
    },


    state: {
        token: localStorage.getItem('token'),
        errors: []
    },

    getters: {
        isAuth: state => {
            return state.token != "null" && state.token != null
        }
    },

    mutations: {
        SET_TOKEN(state,payload) {
            state.token = payload
        },
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
        CLEAR_ERRORS(state) {
            stete.errors = []
        }
    }
})

export default store