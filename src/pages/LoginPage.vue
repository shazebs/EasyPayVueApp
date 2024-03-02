<template>
    <div class="login-page">
        <h1 style="color:#635bff; margin:0px; margin-bottom:10px;">Login</h1>

        <form @submit.prevent="handleLogin()" class="login-form">
            <div><input class="login-input" type="text" v-model="username" placeholder="Username"/></div>
            <div><input class="login-input" type="password" v-model="password" placeholder="Password"/></div>
            <div><button class="login-button" type="submit">Login to EasyPay!</button></div>
        </form>

    </div>
</template>

<script>
//import axios from 'axios'; 

export default {
    name: 'LoginPage',
    data() {
        return {
           email: '',
           password: '',
           username: ''
        }
    },
    methods: {
        handleLogin() {
            alert('Try signing up first before logging in!');
        }
        // async handleLogin() {
        //     const response = await axios.post('login', {
        //         email: this.email,
        //         password: this.password,
        //         username: this.username
        //     });
        //     console.log(response);
        //     localStorage.setItem('token', response.data.token);
        //     this.$router.push('/');
        // }
    }
};
</script>

<style scoped>
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
</style>