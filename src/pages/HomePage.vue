<template>
    <div>
        <h2 style="text-align:center;">Welcome to 
            <span>[<span style="color:#635bff">Stripe EasyPay</span>]</span> by <span style="">@</span><a href="https://www.instagram.com/shazebs" target="_blank" style="font-size:100%;">shazebs</a>
        </h2>

        <div align="center">     
            <h3 v-if="!user">You are not logged in!</h3>  
            <h3 v-if="user">Hi, {{user.username}}!</h3>        
        </div>

        <div v-if="user">
            <UserCatalog />
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import UserCatalog from '../components/UserCatalog.vue'; 

export default {
    name: 'HomePage',
    computed: {
        ...mapGetters(['user'])
    },
    components: {
        UserCatalog
    }
}; 
</script>