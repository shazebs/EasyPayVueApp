<template>
    <header>
        <router-link to="/">Home</router-link>
        <router-link to="/login" v-if="!user">Login</router-link> 
        <router-link to="/signup" v-if="!user">Signup</router-link>
        <!-- <a href="javascript:void(0)" @click="handleLogout()" v-if="user">Logout</a> -->
        <router-link to="" @click="handleLogout()" v-if="user">Logout</router-link>
    </header>
</template>

<script>
import {mapGetters} from 'vuex'; 

export default {
    name: 'NavigationBar',
    methods: {
        handleLogout() {
            if (confirm("Are you sure you want to logout?"))
            {
                // reset user state
                this.$store.dispatch('user', null);
                localStorage.removeItem('token');
                this.$router.push('/login'); 
            }
        }
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>

<style scoped>
header {
    border-bottom:2px dashed black;
    border-top:2px dashed black;
    display:flex;
    justify-content: space-evenly;   
    margin:auto;
    padding:8px 0px;    
}    
</style>
