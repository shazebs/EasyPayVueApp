<template>
    <div class="user-catalog">
        <form @submit.prevent="submitPayment()">
            <div class="form-control">

                <img :src="salesOrder.image" style="border-radius:8px; width:100%; max-width:400px; height:auto; margin:auto;"/>

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

                <section style="text-align:center;">
                    <button class="x-button" type="submit" style="margin-top:20px; width:75px;">Submit</button>
                </section>
            </div>

            <div v-if="catalog">
                <section v-for="(item, index) in catalog" :key="index">
                    <ul>
                        <li><img :src="item.image" style="width:200px; height:auto;"></li>
                        <li>Name: {{ item.name }}</li>
                        <li>Price: ${{ item.price }}</li>
                        <li>Currency: {{ item.currency }}</li>
                    </ul> 
                </section>               
            </div>
        </form>
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
            catalog: null
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
            }
            catch (error) {
                console.log('submit payment error', error.response.data); 
            }
        },
        removeNonNumbers() {
            this.salesOrder.price = this.salesOrder.price.replace(/[^0-9,.]/g, '');
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
    }
</style>