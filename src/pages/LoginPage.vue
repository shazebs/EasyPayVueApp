<template>
    <div class="login-page">

        <h1 style="color:#635bff; margin:0px; margin-bottom:10px;">Login</h1>

        <h3 v-if="loginStatus" :class="loginStatus.success ? 'success' : 'error'">{{ loginStatus.message }}</h3>

        <form @submit.prevent="handleLogin()" class="login-form">
            <div><input class="login-input" type="text" v-model="username" placeholder="Username" required/></div>
            <div><input class="login-input" type="password" v-model="password" placeholder="Password" required/></div>
            <div><button class="login-button" type="submit">Access EasyPay!</button></div>
        </form>

    </div>
</template>

<script>
import axios from 'axios'; 
import {mapState} from 'vuex'; 

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
            this.loginStatus = this.$store.state.user;                
            try {  
                const response = await axios.post('login', {
                    username: this.username,
                    password: this.password,
                });         
                
                this.$store.dispatch('user', response.data.user); 
                this.$router.push('/');
            } 
            catch (error) {
                this.loginStatus = error.response.data;
                this.$store.dispatch('user', error.response.data.user);
            }
        }
    },
    computed: {
        ...mapState(['user'])
    }
};
</script>

<style scoped>
.appear {
    transition:all 5s ease-in-out;
}
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
    transition:all 0.2s ease;
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