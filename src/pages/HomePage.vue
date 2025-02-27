<template>
    <div>
        <!-- Home page title -->
        <h2 style="text-align:center; margin-bottom:5px;">Welcome to 
            <span>[<span style="color:#635bff">Stripe EasyPay</span>]</span> by <span style="">@</span><a href="https://www.instagram.com/shazebs" target="_blank" style="font-size:100%;">shazebs</a>
        </h2>

        <!-- Login status message -->
        <div align="center">     
            <h3 v-if="user" style="margin:10px 5px;">Hi, <span style="color:#635bff;">{{user.username}}</span>!</h3>        
            <h3 v-if="!user" style="margin:5px;">You are not logged in!</h3>  
        </div>

        <!-- Show User Catalog component if user is logged -->
        <div v-if="user">
            <UserCatalog />
        </div>

        <!-- Top Sellers container -->
        <div v-if="!user && sellers" class="top-sellers-container">
            <h1 style="margin-top:10px; margin-bottom:5px; text-decoration:underline;">Top Sellers</h1>
            <section v-for="(num_items, seller) in sellers" :key="seller">
                <a :href="sellerUrl(seller)">{{ seller }}</a> <span style="font-size:105%;">({{ num_items }})</span>
            </section>
        </div> 

        <!-- Show seller catalog display if user is not logged in and URL parameter is queried -->
        <div v-if="this.username && !this.user">

            <!-- indicate URL parameter username -->
            <h2 v-if="userCatalog" style="margin-bottom:5px; margin-top:12px; text-align:center;">View <span style="color:#635bff;">{{ username }}</span>'s catalog here:</h2>
            
            <!-- error message if user has zero catalog items -->
            <h2 v-else style="text-align:center;"><span style="color:#635bff;">{{ username }}</span> has zero catalog items.</h2>
            
            <!-- display catalog items for specific user -->
            <section class="user-catalog">
                <section v-for="(item, index) in userCatalog" :key="index" class="user-catalog-item">
                    <img :src="item.image" class="user-catalog-item-image"/>
                    <section class="item-description">{{ item.name }}</section>
                    <section class="item-price"><span class="money">$</span>{{ item.price }} <span class="money">{{ item.currency }}</span></section>
                    <button class="checkout-button" @click="checkoutItem(item)">Checkout</button>
                </section>
            </section>
        </div>        

        <div v-if="loadingGif" style="text-align:center;">  
            <img src="https://i.imgur.com/llF5iyg.gif" style="width:50px;"/>
            <br/>
            Please wait ...
        </div> 

        <!-- test button -->
        <button v-if="false" @click="currentURL()">Check URL</button>

    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import UserCatalog from '../components/UserCatalog.vue';

export default {
    name: 'HomePage',
    data() {
        return {
            username: null,
            userCatalog: null,
            sellers: null,
            loadingGif: true,
        }
    },
    components: 
    {
        UserCatalog
    },
    computed: 
    {
        ...mapGetters(['user'])
    },
    async mounted() 
    {
        // Access URL parameter when the component is mounted
        this.username = this.$route.params.username;

        // if username param exists and no user is logged in, get user's catalog for display.
        if (this.username && !this.user) 
        {
            // capitalize the username param's first letter
            this.username = this.username.charAt(0).toUpperCase() + this.username.slice(1);

            this.getUserCatalog();
        }
        // if username param DNE and user not logged in
        else 
        {
            try 
            {
                const response = await axios.get("sellers"); 

                // console.log(response.data); // debug

                this.sellers = response.data.sellers; 

                this.loadingGif = false;
            }
            catch (error) 
            {
                alert(error.response.data.message); 
            }
        }
    },
    methods: {
        async checkoutItem(item) {
            try {
                // make a call to EasyPay API single checkout endpoint
                const response = await axios.post('checkout', {
                    id: item.id,
                    username: item.username,
                    name: item.name,
                    price: item.price,
                    currency: item.currency,
                    image: item.image,
                    return_url: `${window.location.protocol}//${window.location.host}${window.location.pathname}`
                });

                // navigate to Stripe checkout page
                window.location.href = response.data.payment_url;
            } 
            catch (error) {
                alert(error.response.data.message); 
            }
        },
        currentURL() {
            const currentHost = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
            return currentHost; 
        },
        async getUserCatalog() {
            try {
                // get username's catalog indicated in URL parameter
                const response = await axios.post('/catalog', {
                    username: this.username
                });

                // instantiate username's catalog items for display
                this.userCatalog = response.data.catalog;

                this.loadingGif = false;
            }
            catch (error) {
                alert(error.response.data);
            }
        },
        sellerUrl(seller) {
            return `${this.currentURL()}${seller}`;
        }
    }
}; 
</script>

<style scoped>
    .user-catalog {
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        padding:0px 10px;
    }
    .user-catalog-item {
        border:2px solid #635bff;
        display:flex;
        flex-direction:column;
        align-items:center;
        margin:8px 5px;
        max-width:175px;
        min-width:175px;
        padding-bottom:8px;
        text-align:center;
    }
    .user-catalog-item-image {
        max-width:175px;
        height:160px;
    }
    .item-description {
        padding:5px 4px;
    }
    .item-price {
        padding-bottom:10px;
    }
    .money {
        color:green;
    }
    .checkout-button {
        background: transparent;
        border:2px solid #635bff;
        border-radius:4px;
        color:#635bff;
        font-size:1.05rem;
        padding:5px 10px;
    }
        .checkout-button:hover {
            cursor:pointer;
            background:#635bff;
            color:white;
            transition:all 0.2s ease;
        }

    .top-sellers-container {
        line-height:1.75;
        text-align:center;
    }
</style>