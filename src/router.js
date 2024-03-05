import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/HomePage.vue'; 
import Login from './pages/LoginPage.vue';
import Signup from './pages/SignupPage.vue';

const routes = [
    { path: '/', component: Home },
    // { path: '/:username', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;