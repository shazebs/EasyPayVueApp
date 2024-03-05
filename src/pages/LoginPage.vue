<template>
    <div class="login-page">

        <!-- Login page title -->
        <h1 style="color:#635bff; 
                   margin:0px; 
                   margin-bottom:10px;">
            Login
        </h1>

        <!-- 'Account not found' message -->
        <h3 v-if="loginStatus" :class="loginStatus.success ? 'success' : 'error'">{{ loginStatus.message }}</h3>

        <!-- User registered message -->
        <h3 v-if="registerSuccess" class="success">You have successfully registered and can log in!</h3>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin()" class="login-form">
            <div> <!-- Login Username -->
                <input class="login-input" type="text" v-model="username" placeholder="Username" required/>
            </div>
            <div> <!-- Login Password -->
                <input class="login-input" type="password" v-model="password" placeholder="Password" required/>
            </div>
            <div> <!-- Login Button -->
                <button class="login-button" type="submit">Access EasyPay!</button>
            </div>
        </form>

    </div>
</template>

<script>
import axios from 'axios'; 
import { mapState } from 'vuex'; 

export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: '',
            loginStatus: null
        }
    },
    methods: {
        async handleLogin() {                
            this.loginStatus = null; // turn off 'user does not exist' UI message 
            try {  
                const response = await axios.post('login', {
                    username: this.username,
                    password: this.password,
                });            

                // set user after successful login
                this.$store.dispatch('user', response.data.user); 
                localStorage.setItem('token', JSON.stringify(response.data.user)); 

                // turn off registerSuccess message
                if (this.registerSuccess) {
                    this.$store.dispatch('registerSuccess', false); 
                }                

                this.$router.push('/'); // go to homepage
            } 
            catch (error) {
                // for displaying UI error message 
                this.loginStatus = error.response.data; 

                // set user state to null
                this.$store.dispatch('user', error.response.data.user); 
            }
        }
    },
    computed: {
        ...mapState(['user', 'registerSuccess'])
    }
};
</script>

<style scoped>
.error {
    color:red;
}
.login-form {
    display:flex;
    flex-direction:column;
}
.login-button {
    background: transparent;
    border:2px solid #635bff;
    border-radius:4px;
    color:#635bff;
    font-size:1.05rem;
    margin-top:5px;
    padding:5px 10px;
    /* transition:all 0.2s ease; */
}
.login-button:hover {
    cursor:pointer;
    background:#635bff;
    color:white;
    transition:all 0.2s ease;
}
.login-form div {
    margin:5px 0px;
}
.login-input {
    font-size:1.05rem;
    width:300px;
}
.login-page {
    margin:0px;
    padding-top:10px;
    text-align:center;
}
.success {
    color:limegreen;
}
</style>