import $axios from '../api.js'

const state = () => ({
    customers : [],
    customer :  {
        nik: '',
        name: '',
        address: '',
        phone: ''
    },
    page: 1 
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.customers = payload
    }
}

const actions = {
    getCustomers({ commit, state}, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject)  => {
            $axios.get(`/customer?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA',response.data)
                resolve(response.data)
            })
        })
    },
    submitCustomer({ dispatch, commit, state}) {
        return new Promise((resolve, reject) => {
            $axios.post(`/customer`,state.customer)
            .then((response) => {
                dispatch('getCustomers').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                if(error.response.status == 422) {
                    commit('SET_ERRORS',error.response.data.errors, { root:true })
                }
            })
        })
    },
    editCustomer({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/customer/${payload}/edit`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data.status)
                resolve(response.data)
            })
        })
    },
    updateCustomer( {state, commit}, payload) {
       return new Promise((resolve, reject) => {
            $axios.put(`/customer/${payload}`, state.customer) 
            .then((response) => {
                commit('CLEAR_FORM')
                resolve(response.data)
            })
       })
    },
    removeCustomer( {dispatch}, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/customer/${payload}`)
            .then((resolve) => {
                dispatch('getCustomer').then(() => resolve())
            })
        })
    }
}

export default{
    namespaced: true,
    mutations,
    state,
    actions
}