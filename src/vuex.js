import { createStore } from 'vuex'; 

const state = {
    user: null,
    registerSuccess: '',
    showNav: true
};

const store = new createStore({
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        registerSuccess: (state) => {
            return state.registerSuccess;
        },
        showNav: (state) => {
            return state.showNav;
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user); 
        },
        registerSuccess(context, registerSuccess) {
            context.commit('registerSuccess', registerSuccess); 
        },
        showNav(context, showNav) {
            context.commit('showNav', showNav);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        registerSuccess(state, registerSuccess) {
            state.registerSuccess = registerSuccess;
        },
        showNav(state, showNav) {
            state.showNav = showNav;
        }
    }
});

export default store;