import Vue from 'vue'
import Vuex from 'vuex'
import CallApi from '../services/CallApi'


Vue.use(Vuex)


const user = JSON.parse(localStorage.getItem('user'))

const initialState = user 
? { status: { loggedIn: true }, user }
: { status: { loggedIn: false }, user: null}



export default new Vuex.Store({


   state: initialState,

  
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true
            state.user = user
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null
        },


        signupSuccess(state) {
            state.status.loggedIn = false
        }, 
        signupFailure(state) {
            state.status.loggedIn = false
        },


        getPostsSuccess() {
          
        }
    },

   // actions
   actions: {
    login({ commit }, user) {
        return CallApi.login(user)
        .then(user => {
            commit('loginSuccess', user);
            return Promise.resolve(user)
        }, error => {
            commit('loginFailure');
            return Promise.reject(error)
        }
        )
    },

    logout({ commit }) {
        CallApi.logout()
        commit('logout')
    },

    signup({ commit }, user) {
        return CallApi.signup(user)
        .then(response => {
            commit('signupSuccess')
            return Promise.resolve(response.data)
        }, 
        error => {
            commit('signupFailure')
            return Promise.reject(error)
        }
        )
    }
},
  
/*   modules: {
    authModule
  } */
})
