<template>
    <div class="signup-page">
        <!-- Signup page title -->
        <h1 style="color:#635bff; margin:0px; margin-bottom:10px;">Signup</h1>

        <!-- Display error messages -->
        <div class="error-message" v-if="errors.password_regex" :class="{'slide-in': errors.password_regex}">
            <!-- Password fails regex error -->
            <span></span>Password must contain at minimum eight characters, at least one letter and one number. <span @click="closeError('password_regex')">&times;</span>
        </div>
        <div class="error-message" v-if="errors.password_match" :class="{'slide-in': errors.password_match}">
            <!-- Password do not match error -->
            <span></span>Passwords do not match. <span @click="closeError('password_match')">&times;</span>
        </div>
        <div class="error-message" v-if="errors.username_exists" :class="{'slide-in': errors.username_exists}">
            <!-- Username already exists error -->
            <span></span>{{errors.username_exists_message}}<span @click="closeError('username_exists')">&times;</span>
        </div>

        <form @submit.prevent="handleSignup()" class="signup-form">
            <!-- Email -->
            <div><input class="signup-input" type="email" v-model="email" placeholder="Email" required/></div>
            <!-- Desired Username -->
            <div><input class="signup-input" type="text" v-model="username" placeholder="Username" required/></div>
            <!-- Desired Password -->
            <div><input class="signup-input" type="password" v-model="password" placeholder="Password" required/></div>
            <!-- Re-type password -->
            <div><input class="signup-input" type="password" v-model="password_retype" placeholder="Re-type Password" required/></div>
            <!-- Stripe API Key -->
            <div><textarea class="signup-textarea" type="text" v-model="stripeApiKey" placeholder="Stripe API Key" ></textarea></div>
            <!-- Submit registration button -->
            <div><button class="signup-button" type="submit">Join EasyPay! :)</button></div>
        </form>

    </div>
</template>

<script>
import axios from 'axios'; 
// import NodeRSA from 'node-rsa';

export default {
    name: 'SignupPage',
    data() {
        return {
            email: '',
            password: '',
            password_retype: '',
            stripeApiKey: '',
            username: '',
            errors: {
                password_regex: false,
                password_match: false,
                username_exists: false,
                username_exists_message: null
            }
        }
    },
    methods: {
        async handleSignup() {
            if (!this.checkValidations()) return;
            try {
                // make signup registration request to EasyPay API
                const response = await axios.post('register', {
                    email: this.email,
                    username: this.username.toLowerCase(),
                    password: this.password,
                    stripe_key: this.stripeApiKey
                });

                // best-case scenario for account registration 
                if (response.data.success) {
                    // for registration success UI message on login page 
                    this.$store.dispatch('registerSuccess', response.data.message);

                    // direct user to login
                    this.$router.push('/login'); 
                }
                else {
                    // set username already exists error message
                    if (response.data.message === `Username '${this.username}' already exists!`) {
                        this.errors.username_exists = true;
                        this.errors.username_exists_message = response.data.message;
                    }
                    else {
                        // pop up server error message 
                        alert(this.response.data.message);
                    }
                }
            }
            // handle any errors that may occur during API request
            catch (error) {
                if (error.response.data.success === false) {
                    alert(error.response.data.message);
                }
            } 
        },
        closeError(errorKey) {
            this.errors[errorKey] = false;
        },
        checkValidations() {                
            // validate if password fulfills regex requirement
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password) === false) {
                this.errors.password_regex = true;
                return false;
            } else {
                this.errors.password_regex = false;
            }

            // validate if passwords match 
            if (this.password !== this.password_retype) {
                this.errors.password_match = true;
                return false;
            } else {
                this.errors.password_match = false;
            }

            this.errors.username_exists = false;
            this.errors.username_exists_message = null;

            return true;
        }
    }
};
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
        margin: 10px auto; 
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