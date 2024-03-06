<template>
    <div class="user-catalog">
        <form @submit.prevent="submitPayment()">
            <div class="form-control">
                <img v-if="salesOrder.image !== ''" :src="salesOrder.image" style="border-radius:8px; width:100%; max-width:400px; height:auto; margin:auto;"/>

                <!-- Name -->
                <section class="form-control-label">Name&nbsp;</section>
                <section style="width:100%;"><input v-model="salesOrder.name" class="form-control-input" type="text" required /></section>

                <!-- Price -->
                <section class="form-control-label">Price&nbsp;</section>
                <section style="width:100%;"><input v-model="salesOrder.price" class="form-control-input" @input="removeNonNumbers()" type="text" required /></section>

                <section>
                    <select class="x-button" v-model="salesOrder.currency" style="font-size:95%; margin-top:10px; width:100px;" requireds>
                        <option disabled style="color:white;">Currency</option>
                        <option>USD</option>
                        <option>AED</option>
                        <option>PKR</option>
                        <option>INR</option>
                        <option>EUR</option>
                    </select>
                </section>      
                
                <section class="form-control-label">Image URL&nbsp;</section>
                <section style="width:100%;"><input v-model="salesOrder.image" class="form-control-input" type="text" required /></section>
                <section><button class="x-button" @click.prevent="clearImage()">Clear Image</button></section>

                <section style="text-align:center;">
                    <button class="x-button" type="submit" style="margin-top:20px;">Submit</button>
                </section>
            </div>
        </form>        
    </div>

    <div style="display:flex; padding:15px 0px;">
        <div v-if="catalog" style="display:flex; 
                                   flex-wrap:wrap;
                                   justify-content:center; 
                                   width:100%;">
            <section class="catalog-item" v-for="(item, index) in catalog" :key="index" 
                        style="border:2px dashed #635bff; 
                            border-radius:12px;
                            display:flex; 
                            flex-direction:column;
                            font-size:1.05rem;
                            line-height:1.25;
                            margin:8px;
                            max-width:250px;
                            padding:12px 8px;
                            text-align:center;">
                    <div><img :src="item.image" class="catalog-item-image"></div>
                    <div>{{ item.name }}</div>
                    <div style="padding:8px 0px;">${{ item.price }} {{ item.currency }}</div>
                    <div><button class="x-button" @click="checkoutItem(item)">Checkout</button></div>
            </section>               
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios'; 

export default {
    name: 'UserCatalog',
    data() {
        return {
            return_url: 'https://localhost:8080/',
            salesOrder: {
                username: '',
                name: '',
                price: '',
                currency: 'USD',
                image: '',
            },
            catalog: null,
            dynamic_url: '',
        }
    },
    methods: {
        async submitPayment() {
            try {
                this.salesOrder.price = parseFloat(this.salesOrder.price);
                this.salesOrder.price = Math.round(this.salesOrder.price * 100) / 100;
                this.salesOrder.username = this.currentUser.username;

                const response = await axios.post('v2/easypay', this.salesOrder);
                this.catalog = response.data.catalog;
                this.clearSalesOrder(); 
            }
            catch (error) {
                alert(error.response.data.message); 
            }
        },
        removeNonNumbers() {
            this.salesOrder.price = this.salesOrder.price.replace(/[^0-9,.]/g, '');
        },
        clearImage() {
            this.salesOrder.image = '';
        },
        clearSalesOrder() {
            this.salesOrder.name = '',
            this.salesOrder.price = '',
            this.clearImage();
        },
        async checkoutItem(item) {
            try {
                const response = await axios.post('checkout', item);
                window.location.href = response.data.payment_url;
            } 
            catch (error) {
                alert(error.response.data.message); 
            }
        }
    },
    computed: {
        ...mapState({
            currentUser: 'user',
        })
    },
    async created() {
        try {
            const response = await axios.post('catalog', {
                username: this.currentUser.username
            });

            this.catalog = response.data.catalog;
        }
        catch (error) {
            console.log('created user catalog error', error);
        }
    }
}
</script>

<style scoped>
    .catalog-item-image {
        height: 20vh;
        width: 20vh; 
    }
    .user-catalog {
        border:2px dashed #635bff;
        border-radius:12px;
        padding:10px 8px 15px 8px;
        margin:auto;
        max-width:800px;
    }
    .form-control {
        display:flex;
        flex-direction:column;
        text-align:center;
        width:100%;
    }
    .form-control-label {
        /* align-items:center; */
        color:#635bff;
        display:flex;
        font-size:1.1rem;
        justify-content:center;
        margin-top:10px; 
        min-width:55px;
    }
    .form-control-input {
        font-size:1.05rem;
        max-width:450px;
        text-align:center;
        width:98%;
    }

    .x-button {
    background: transparent;
    border:2px solid #635bff;
    border-radius:4px;
    color:#635bff;
    font-size:1.05rem;
    margin-top:5px;
    padding:5px 10px;
    }
        .x-button:hover {
            cursor:pointer;
            background:#635bff;
            color:white;
            transition:all 0.2s ease;
        }

    @media (max-width:500px) {
        .form-control-label {
            justify-content:start;
        }
        .form-control-label {
            width:95%;
        }
        .catalog-item {
            width:150px;
        }
        .catalog-item-image {
            width:15vh;
            height:15vh;        
        }
    }
</style>