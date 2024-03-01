<template>
    <div>
        <h1>Signup</h1>
        <form @submit.prevent="handleSignup()">
            <input type="email" v-model="email" placeholder="Email"/><br/>
            <input type="text" v-model="username" placeholder="Enter Username"/><br/>
            <input type="password" v-model="password" placeholder="Enter Password"/><br/>
            <input type="password" v-model="password_confirm" placeholder="Confirm Password"/><br/>
            <input type="text" v-model="stripeApiKey" placeholder="Stripe API Key"/><br/>
            <button type="submit">Signup</button>
        </form>
    </div>
</template>

<script>

export default {
    name: 'SignupPage',
    data() {
        return {
            email: '',
            password: '',
            password_confirm: '',
            stripeApiKey: '',
            username: '',
        }
    },
    methods: {
        handleSignup() {
            const data = {
                email: this.email,
                username: this.username,
                password: this.password,
                password_confirm: this.password_confirm,
                stripeApiKey: this.stripeApiKey
            }
            console.log(data);
        }
    }
};
</script>