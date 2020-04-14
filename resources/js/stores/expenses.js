import $axios from '../api.js'

const state = () => ({
    expenses: [],
    page: 1
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.expenses = expenses
    },

    SET_PAGE(state, payload) {
        state.page = page
    }
}

const actions = {
    getExpenses({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/expenses?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA',response.data)
                resolve(response.data)
            })
        })
    },
    submitExpenses({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/expenses`, payload)
            .then((response) => {
                dispatch('getExpenses').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                if(error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errrors, { root:true })
                }
            })
        })
    },
    editExpenses({commit}, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/expenses/${payload}/edit`)
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    updateExpenses({ commit }, payload) {
        return new Promise((resolve, project) => {
            $axios.put(`/expenses/${payload.id}`,payload)
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    removeExpenses({ dispatch },payload ) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/expenses/${payload}`)
            .then((response) => {
                dispatch('getExpenses').then(() => resolve())
            })
        })   
    },
    acceptExpenses({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/expenses/accept`, { id: payload })
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    cancelExpenses({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/expenses/cancel`, payload)
            .then((response) => {
                resolve(response.data)
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}