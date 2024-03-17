<template>
    <div class="account-page">
        <h1 style="color:#635bff; 
                   margin:0px; 
                   margin-bottom:10px;">
            Account
        </h1>      
        
        <!-- Username already exists error message -->
        <div class="error-message" v-if="errors.username_exists" :class="{'slide-in': errors.username_exists}">
            <span></span>{{errors.username_exists_message}}<span @click="closeError('username_exists')">&times;</span>
        </div>
        <!-- Update Username form -->
        <form @submit.prevent="updateUsername()" class="account-form" v-if="user">
            <div><input class="input-field" v-model="username" type="text" :placeholder="user.username" required /></div>
            <div><input class="input-field" v-model="username_password" type="password" placeholder="Confirm password" required /></div>
            <div><button type="submit" class="update-button">Update Username</button></div>
        </form>

        <!-- Password fails regex error -->
        <div class="error-message" v-if="errors.password_regex" :class="{'slide-in': errors.password_regex}">
            <span></span>Password must contain at minimum eight characters, at least one letter and one number. <span @click="closeError('password_regex')">&times;</span>
        </div>
        <!-- Password do not match error -->
        <div class="error-message" v-if="errors.password_match" :class="{'slide-in': errors.password_match}">            
            <span></span>Passwords do not match. <span @click="closeError('password_match')">&times;</span>
        </div>
        <!-- Update Password form -->
        <form @submit.prevent="updatePassword()" class="account-form" v-if="user" style="margin-top:25px;">
            <div><input class="input-field" v-model="current_password" type="password" placeholder="Enter current password" required /></div>
            <div><input class="input-field" v-model="new_password" type="password" placeholder="Enter new password" required /></div>
            <div><input class="input-field" v-model="retype_password" type="password" placeholder="Re-type new password" required /></div>
            <div><button type="submit" class="update-button">Update Password</button></div>
        </form>

        <!-- Update Email form -->
        <form @submit.prevent="updateEmail()" class="account-form" v-if="user" style="margin-top:25px;">
            <div><input class="input-field" v-model="email" type="email" :placeholder="user.email" required /></div>
            <div><input class="input-field" v-model="email_password" type="password" placeholder="Confirm password" required /></div>
            <div><button type="submit" class="update-button">Update Email</button></div>
        </form>

        <!-- Update Stripe API Key form -->
        <form @submit.prevent="updateStripeKey()" class="account-form" v-if="user" style="margin-top:25px;">
            <div><input class="input-field" v-model="stripe_key" type="password" placeholder="Enter new Stripe API Key" required /></div>
            <div><input class="input-field" v-model="stripe_password" type="password" placeholder="Confirm password" required /></div>
            <div><button type="submit" class="update-button">Update Stripe API Key</button></div>
        </form>

    </div>
</template>

<script>
import { mapState } from 'vuex'; 
import axios from 'axios';

export default {
    name: 'AccountPage',
    data() {
        return {
            // for username form
            username: '',
            username_password: '',
            // for password form
            current_password: '',
            new_password: '',
            retype_password: '',
            errors: {
                password_regex: false,
                password_match: false
            },
            // for email form
            email: '',
            email_password: '',
            // for stripe key form
            stripe_key: '',
            stripe_password: '',            
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async updateUsername() {
            if (this.username === this.user.username) {
                alert("That's already your username.");
                return;
            }
            try {
                const response = await axios({
                    method: 'put',
                    url: 'usernames',
                    data: {
                        current_username: this.user.username,
                        new_username: this.username,
                        password: this.username_password
                    }
                });

                if (response.data.success) {
                    // pop-up username successfully changed message
                    alert(`Username successfully updated from '${this.user.username}' to '${response.data.user.username}'`);

                    // set user state after successful login
                    this.$store.dispatch('user', response.data.user); 
                    localStorage.setItem('token', JSON.stringify(response.data.user));

                    // reset username change form 
                    this.username = ''; 
                    this.username_password = '';
                }
                // Alert error message 
                else {
                    alert(`${response.data.message}`)
                }
            }
            // Handle any errors that may occur
            catch (error) {
                console.error(error);
            }
        },
        async updatePassword() {
            if (!this.checkValidations()) return;
            try {
                const response = await axios({
                    method: 'put',
                    url: 'passwords',
                    data: {
                        username: this.user.username,
                        current_password: this.current_password,
                        new_password: this.new_password
                    }
                });

                if (response.data.success) {
                    // pop-up password successfully changed message
                    alert(`${response.data.message}`);

                    // reset password change form 
                    this.current_password = ''; 
                    this.new_password = '';
                    this.retype_password = '';
                }
                // Alert error message 
                else {
                    alert(`${response.data.message}`)
                }
            }
            catch (error) {
                console.error(error);
            }            
        },
        async updateEmail() {
            if (this.email === this.user.email) {
                alert("That's already your email.");
                return;
            }
            try {
                const response = await axios({
                    method: 'put',
                    url: 'emails',
                    data: {
                        username: this.user.username,
                        new_email: this.email,
                        password: this.email_password
                    }
                });

                if (response.data.success) {
                    // pop-up username successfully changed message
                    alert(`Successfully updated email from '${this.user.email}' to '${response.data.user.email}'`);

                    // set user state after successful login
                    this.$store.dispatch('user', response.data.user); 
                    localStorage.setItem('token', JSON.stringify(response.data.user));

                    // reset username change form 
                    this.email = ''; 
                    this.email_password = '';
                }
                // Alert error message 
                else {
                    alert(`${response.data.message}`)
                }
            }
            // Handle any errors that may occur
            catch (error) {
                console.error(error);
            }
        },
        async updateStripeKey() {
            try {
                const response = await axios({
                    method: 'put',
                    url: 'stripekeys',
                    data: {
                        username: this.user.username,
                        password: this.stripe_password,
                        stripe_key: this.stripe_key
                    }
                });

                if (response.data.success) {
                    // pop-up username successfully changed message
                    alert(`Successfully updated Stripe API Key'`);

                    // reset stripe key change form 
                    this.stripe_key = ''; 
                    this.stripe_password = '';
                }
                // Alert error message 
                else {
                    alert(`${response.data.message}`)
                }
            }
            // Handle any errors that may occur
            catch (error) {
                console.error(error);
            }
        },    
        closeError(errorKey) {
            this.errors[errorKey] = false;
        },    
        checkValidations() {                
            // validate if password fulfills regex requirement
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.new_password) === false) {
                this.errors.password_regex = true;
                return false;
            } else {
                this.errors.password_regex = false;
            }

            // validate if passwords match 
            if (this.new_password !== this.retype_password) {
                this.errors.password_match = true;
                return false;
            } else {
                this.errors.password_match = false;
            }

            return true;
        },
    }
}
</script>

<style scoped>

    @keyframes slideIn {
        from {
            transform:translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }
    .slide-in {
        animation: slideIn 0.5s forwards;
    }

    .error-message {
        align-items: center;
        background: lightcoral; 
        border: 2px solid red; 
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        margin: 15px auto 0px auto; 
        min-width: 300px; 
        padding: 3px; 
        width: 50%;
    }
        .error-message span {
            font-size:larger;
            margin-right:5px; 
        }
            .error-message span:hover {
                color:white; 
                cursor:pointer;
            }
    .account-page {
        margin-top:10px;
        margin-bottom:25px; 
        text-align:center;
    }
    .account-form {
        display:flex;
        flex-direction:column;
    }
    .input-field {
        font-size:1.05rem;
        margin-bottom:10px; 
        width:300px;
    }
    .update-button {
        background: transparent;
        border:2px solid #635bff;
        border-radius:4px;
        color:#635bff;
        font-size:1.05rem;
        padding:5px 10px;
    }
        .update-button:hover {
            cursor:pointer;
            background:#635bff;
            color:white;
            transition:all 0.2s ease;
        }
</style>