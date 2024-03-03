<template>
    <div>

        <h2 style="text-align:center;">Welcome to 
            <span>[<span style="color:#635bff">Stripe EasyPay</span>]</span> by <span style="">@</span><a href="https://www.instagram.com/shazebs" target="_blank" style="font-size:100%;">shazebs</a>
        </h2>

        <div align="center">
            <h3 v-if="user">Hi, {{user.username}}!</h3>  
               
            <img v-if="user" src="https://synder.com/blog/wp-content/uploads/sites/5/2022/09/stripe-secure-payment-method.png" style="width:100%;"/>

            <h3 v-if="!user">You are not logged in!</h3>            
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'HomePage',
    //props: ['user'],
    data() {
        return {
            //user: null
        }
    },
    /*async created() {
        const response = await axios.get('user');         
        console.log(response); 
        this.user = response.data;
    }*/
    methods: {

    },
    computed: {
        ...mapGetters(['user'])
    }
}; 
</script>

<style scoped>

</style>