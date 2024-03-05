import { createStore } from 'vuex'; 

const state = {
    user: null,
    registerSuccess: false
};

const store = new createStore({
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        registerSuccess: (state) => {
            return state.registerSuccess;
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user); 
        },
        registerSuccess(context, registerSuccess) {
            context.commit('registerSuccess', registerSuccess); 
        },
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        registerSuccess(state, registerSuccess) {
            state.registerSuccess = registerSuccess;
        },
    }
});

export default store;