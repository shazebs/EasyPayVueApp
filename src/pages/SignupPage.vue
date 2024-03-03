<template>
    <div class="signup-page">
        <h1 style="color:#635bff; margin:0px; margin-bottom:10px;">Signup</h1>

        <form @submit.prevent="handleSignup()" class="signup-form">
            <div><input class="signup-input" type="email" v-model="email" placeholder="Email" required/></div>
            <div><input class="signup-input" type="text" v-model="username" placeholder="Username" required/></div>
            <div><input class="signup-input" type="password" v-model="password" placeholder="Password" required/></div>
            <div><input class="signup-input" type="password" v-model="password_retry" placeholder="Re-type Password"/></div>
            <div><textarea class="signup-textarea" type="text" v-model="stripeApiKey" placeholder="Stripe API Key" required></textarea></div>
            <div><button class="signup-button" type="submit">Join EasyPay! :)</button></div>
        </form>

    </div>
</template>

<script>
import axios from 'axios'; 

export default {
    name: 'SignupPage',
    data() {
        return {
            email: '',
            password: '',
            password_retry: '',
            stripeApiKey: '',
            username: '',
        }
    },
    methods: {
        async handleSignup() {
            try {
                const response = await axios.post('register', {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    stripe_key: this.stripeApiKey
                });
                if (response.data.success) {
                    this.$store.dispatch('registerSuccess', true);
                    this.$router.push('/login'); 
                }
            }
            catch (error) {
                if (error.response.data.success === false){
                    alert(error.response.data.message);
                }
            } 
        }
    }
};
</script>

<style scoped>
.signup-form {
    display:flex;
    flex-direction:column;
}
.signup-button {
    background: transparent;
    border:2px solid #635bff;
    border-radius:4px;
    color:#635bff;
    font-size:1.05rem;
    margin-top:5px;
    padding:5px 10px;
    transition:all 0.2s ease;
}
.signup-button:hover {
    cursor:pointer;
    background:#635bff;
    color:white;
    transition:all 0.2s ease;
}
.signup-form div {
    margin:5px 0px;
}
.signup-input {
    font-size:1.05rem;
    width:300px;
}
.signup-textarea {
    font-family: "Raleway";
    font-size:1.05rem;
    font-weight:500;
    max-height:82px;
    min-height:82px;
    max-width:300px;
    min-width:300px;
}
.signup-page {
    margin:0px;
    padding-top:10px;
    text-align:center;
}
</style>