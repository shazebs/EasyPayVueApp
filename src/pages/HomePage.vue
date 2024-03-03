<template>
    <div>

        <h2 style="text-align:center;">Welcome to 
            <span>[<span style="color:#635bff">Stripe EasyPay</span>]</span> by <span style="">@</span><a href="https://www.instagram.com/shazebs" target="_blank" style="font-size:100%;">shazebs</a>
        </h2>

        <div align="center">
            <h3 v-if="user">Hi, {{user.username}}!</h3>  

            <img v-if="user" src="https://synder.com/blog/wp-content/uploads/sites/5/2022/09/stripe-secure-payment-method.png" style="width:100%;"/>

            <iframe v-if="user" style="width:100%; height:250px" src="https://www.youtube.com/embed/7edR32QVp_A?si=TAPoyPz4xB2ZqZw4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

            <img v-if="user" src="https://static01.nyt.com/images/2021/03/14/business/14stripe1/14stripe1-superJumbo.jpg" style="width:100%;"/>

            <h3 v-if="!user">You are not logged in!</h3>            
        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'HomePage',
    data() {
        return {}
    },
    methods: {
        // add methods here
    },
    computed: {
        ...mapGetters(['user'])
    }
}; 
</script>

<style scoped>

</style>