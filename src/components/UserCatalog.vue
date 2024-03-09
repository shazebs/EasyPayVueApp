<template>
    <div class="user-catalog">
        <form @submit.prevent="submitPayment()">
            <div class="form-control" ref="productForm">
                <!-- Image -->
               <img v-if="salesOrder.image !== ''" 
                    :src="salesOrder.image" 
                    style="border-radius:8px; 
                           height:auto;
                           margin:auto; 
                           margin-top:10px;
                           max-width:400px;
                           width:100%;"/>

                <!-- Name -->
                <section class="form-control-label">Name</section>
                <section><input v-model="salesOrder.name" class="form-control-input" type="text" required/></section>

                <!-- Price -->
                <section class="form-control-label">Price</section>
                <section><input v-model="salesOrder.price"  @input="removeNonNumbers()" class="form-control-input" type="text" required/></section>
                <span v-if="salesOrder.price !== '' & salesOrder.currency === 'USD'" style="color:black;">Profit after <span style="color:#635bff">Stripe</span>'s fee: <span style="color:green;">$</span>{{ netprofit }}</span>
                
                <!-- Currencies -->
                <section>
                    <select required
                            v-model="salesOrder.currency" 
                            class="x-button" 
                            style="font-size:95%; 
                                   margin-top:10px; 
                                   width:100px;">
                        <option disabled>Currency</option>
                        <option>USD</option>
                        <option>AED</option>
                        <option>PKR</option>
                        <option>INR</option>
                        <option>EUR</option>
                    </select>
                </section>      
                
                <section class="form-control-label">Image URL</section>
                <section><input v-model="salesOrder.image" class="form-control-input" type="text" required/></section>       

                <form @submit.prevent="uploadImage()" style="margin-top:5px;">
                    <section><input type="file" ref="fileInput" accept="image/*"/></section>                                        
                    <section>
                        <button type="submit" class="x-button">Upload</button>
                        &nbsp;OR&nbsp;
                        <button class="x-button" @click.prevent="clearImage()" 
                                        style="color:red; 
                                               border-color:red;"
                                        onmouseover="this.style.backgroundColor='red'; 
                                                     this.style.color='white';"
                                        onmouseout="this.style.backgroundColor='white';
                                                    this.style.color='red';">Clear Image &times;</button>
                    </section>
                </form>

                <section style="margin-top:20px; text-align:center;">
                    <button class="x-button" type="submit">Add to Catalog</button>&nbsp;OR&nbsp;
                    <button class="x-button" @click.prevent="checkoutFromForm()">Checkout</button>
                </section>
                
                <section style="margin-top:20px; text-align:center;">
                    <button @click.prevent="resetForm()" class="x-button">Reset Form</button>
                </section>

            </div>
        </form>   
    </div>

    <div style="display:flex; 
                padding:15px 0px;">
        <div v-if="catalog" 
             style="display:flex; 
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
                    <div style="padding:8px 0px;">Listed Price:<br/><span style="color:green;">$</span>{{ item.price }} <span style="color:green">{{ item.currency }}</span></div>
                    <div style="padding-bottom:10px;" v-if="item.currency === 'USD'">Profit after <span style="color:#635bff">Stripe</span>'s fee:<br/><span style="color:red;">$</span>{{ calculateProfit(item.price) }}</div>
                    
                    <div><button class="x-button" @click="checkoutItem(item)">Checkout</button></div>
                    <div v-if="true" style="margin-top:8px;"><button class="x-button" @click="editItem(item)" 
                                        style="color:green; 
                                               border-color:green;" 
                                        onmouseover="this.style.backgroundColor='green'; 
                                                     this.style.color='white';"
                                        onmouseout="this.style.backgroundColor='white';
                                                    this.style.color='green';">Edit</button>&nbsp;OR&nbsp;
                                    <button class="x-button" @click="deleteItem(item)" 
                                        style="color:red; 
                                               border-color:red;" 
                                        onmouseover="this.style.backgroundColor='red'; 
                                                     this.style.color='white';"
                                        onmouseout="this.style.backgroundColor='white';
                                                    this.style.color='red';">Delete</button></div>

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
            salesOrder: {
                id: null,
                username: '',
                name: '',
                price: '',
                currency: 'USD',
                image: '',
            },
            catalog: null,
            netprofit: 0
        }
    },
    methods: {
        async submitPayment() {
            try {
                this.salesOrder.price = parseFloat(this.salesOrder.price);
                this.salesOrder.price = Math.round(this.salesOrder.price * 100) / 100;
                this.salesOrder.username = this.currentUser.username;
                this.salesOrder.name.trim();
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
            this.netprofit = Math.round(this.salesOrder.price * 100) / 100;
            this.netprofit = this.calculateProfit(this.netprofit);
        },
        calculateProfit(price) {
            let stripeFee = price * 0.029 + 0.3;
            return Math.round((price - stripeFee) * 100) / 100; 
        },
        clearImage() {
            this.salesOrder.image = '';
            this.resetLayout();
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
        },
        checkoutFromForm() {
            if (this.salesOrder.name === '' | this.salesOrder.Price === '' | this.salesOrder.image === '') {
                alert('Enter missing fields.'); 
            } else {
                this.checkoutItem(this.salesOrder);
            }
        },
        editItem(item) {
            this.salesOrder.id = item.id,
            this.salesOrder.name = item.name;
            this.salesOrder.price = item.price;
            this.netprofit = this.calculateProfit(item.price);
            this.salesOrder.currency = item.currency;
            this.salesOrder.image = item.image;
            this.resetLayout();
        },
        async deleteItem(item) {
            try {
                if (confirm(`Are you sure you want to delete?\n${item.name}`)) {
                    const response = await axios({
                        method: 'delete',
                        url: 'catalog',
                        data: item
                    });
                    if (response.data.success) {
                        this.catalog = response.data.catalog; 
                    }
                }
            }
            catch (error)
            {
                console.error('Error deleting item:', error.response ? error.response.data : error.message);
            }
        },
        async uploadImage() {
            if (!this.$refs.fileInput.files[0]) {
                return;
            }
            const formData = new FormData();
            formData.append("file", this.$refs.fileInput.files[0]);
            try {
                const response = await axios.post('image', formData); 
                this.salesOrder.image = response.data.image_url; 
                this.$refs.fileInput.value = null; 
            }
            catch (error) {
                console.error(error.response); 
            }
        },
        resetForm() {
            this.salesOrder.id = null;
            this.salesOrder.name = '';
            this.salesOrder.price = '';
            this.salesOrder.currency = 'USD';
            this.salesOrder.image = '';
            this.resetLayout();
        },
        resetLayout() {
            this.$nextTick(() => {
                const productForm = this.$refs.productForm;
                if (productForm){
                    productForm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center', // 'start', 'center', 'end', or 'nearest'
                        inline: 'nearest' 
                    });
                }
            });
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
            console.log(error);
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
        color:#635bff;
        display:flex;
        font-size:1.1rem;
        justify-content:center;
        margin-top:10px; 
        min-width:55px;
    }
    .form-control-input {
        font-size:1.05rem;
        max-width:600px;
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
            /* justify-content:start; */
        }
        .form-control-input {
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