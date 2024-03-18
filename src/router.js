import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/HomePage.vue'; 
import Login from './pages/LoginPage.vue';
import Signup from './pages/SignupPage.vue';
// import Photos from './components/BlobPhotos.vue'; 
import About from './pages/AboutPage.vue';
import Account from './pages/AccountPage.vue';
import Receipt from './components/ReceiptPage.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/:username', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    // { path: '/photos', component: Photos },
    { path: '/about', component: About },
    { path: '/account', component: Account },
    { path: '/receipt', component: Receipt }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;