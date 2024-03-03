import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './axios';
//import Vuex from 'vuex'; 
import store from './vuex'; 

const app = createApp(App);
app.use(router);
app.use(store); 
app.mount('#app')
