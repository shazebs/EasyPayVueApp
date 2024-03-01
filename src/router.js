import { createRouter, createWebHistory } from "vue-router";

import Index from './pages/IndexPage.vue'; 
import Login from './pages/LoginPage.vue';
import Signup from './pages/SignupPage.vue';

const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/login/:username', component: Login },
    { path: '/login/:username/:id', component: Login },
    { path: '/signup', component: Signup },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;