import AuthService from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))


/*

NOTE: condition exprSivrai = expreSifaux

*/

const initialState = user 
? { status: { loggedIn: true }, user }
: { status: { loggedIn: false }, user: null}

export const auth = {
    namespaced: true, 

    // state
    state: initialState,

    // actions
    actions: {
        login({ commit }, user) {
            return AuthService.login(user)
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
            AuthService.logout()
            commit('logout')
        },

        signup({ commit }, user) {
            return AuthService.signup(user)
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

    // mutations
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
        }
    }
}