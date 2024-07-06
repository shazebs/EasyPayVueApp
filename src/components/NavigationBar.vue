<template>
    <header v-if="showNav">
        <a href="/">Home</a>
        <router-link to="/login" v-if="!user">Login</router-link> 
        <router-link to="/signup" v-if="!user">Signup</router-link>
        <router-link to="/account" v-if="user">Account</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="" @click="handleLogout()" v-if="user">Logout</router-link>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'; 

export default {
    name: 'NavigationBar',    
    computed: {
        ...mapGetters(['user', 'showNav'])
    },
    methods: {
        handleLogout() {
            if (confirm("Are you sure you want to logout?"))
            {
                // nullify user state
                this.$store.dispatch('user', null);

                // remove user token
                localStorage.removeItem('token');

                // navigate to homepage after logout
                this.$router.push('/'); 
            }
        }
    }
}
</script>

<style scoped>
    header {
        border-bottom:2px dashed black;
        display:flex;
        justify-content: space-evenly;   
        margin:auto;
        padding:8px 0px;    
    }    
</style>
