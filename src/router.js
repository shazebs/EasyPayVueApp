import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/HomePage.vue'; 
import Login from './pages/LoginPage.vue';
import Signup from './pages/SignupPage.vue';
import Photos from './components/BlobPhotos.vue'; 
import About from './pages/AboutPage.vue';
import Account from './pages/AccountPage.vue';
import Receipt from './components/ReceiptPage.vue';
import Jobs from './components/JobApps.vue';
import Awards from './pages/SocialAwards.vue';
import Example from './pages/ExampleWorkspace.vue';
import DevNation from './components/DevNation.vue';
import GitNotes from './components/GitNotes.vue';
import UnrealEngine5 from './components/UnrealEngine5.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/:username', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/photos', component: Photos },
    { path: '/about', component: About },
    { path: '/account', component: Account },
    { path: '/receipt', component: Receipt },
    { path: '/jobs', component: Jobs},
    { path: '/awards', component: Awards },
    { path: '/example', component: Example },
    { path: '/dev-nation', component: DevNation },
    { path: '/git-notes', component: GitNotes },
    { path: '/unreal', component: UnrealEngine5 },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;