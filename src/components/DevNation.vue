<template>

    <div id="dev-nation-ui">

        <div id="navbar" class="ui-segment">
 
            <span v-for="(screen, index) in Object.keys(screens)" :key="index">

                <span @click="ToggleScreen(screen)" class="screen" :class="screens[screen].display ? 'screen-active' : ''">{{ screen }}</span>

                <span v-if="index < Object.keys(screens).length-1"> - </span>

            </span> 
            
        </div>


        <transition-group name="screen" tag="div">

            <div id="login" class="ui-segment" v-if="screens.login.display">

                <h1>Login</h1>

                <form @submit.prevent="Login()">

                    <input v-model="screens.login.form.username" type="text" placeholder="Username" required />

                    <br />

                    <input v-model="screens.login.form.password" type="password" placeholder="Password" required />

                    <br />

                    <button type="submit"> SUBMIT </button>

                </form>

            </div>


            <div id="signup" class="ui-segment" v-if="screens.signup.display">

                <h1>Signup</h1>

                <form @submit.prevent="Signup()">

                    <input v-model="screens.signup.form.username" type="text" placeholder="Username" required />

                    <br />

                    <input v-model="screens.signup.form.password" type="text" placeholder="Password" required />

                    <br />

                    
                    <select v-model="screens.signup.form.state" required @change="SelectState">
                        
                        <option value='' disabled selected> Location </option>
                        
                        <option v-for="(state, index) in Object.keys(locations)" :key="index" :value='state'>{{ state }}</option>
                        
                    </select>

                    
                    <br/>
                    
                    <select v-if="screens.signup.form.state !== ''" v-model="screens.signup.form.city" required>
                        
                        <option value='' disabled selected> Nearest City </option>
                        
                        <option v-for="(city, index) in locations[screens.signup.form.state].cities" :key="index">{{ city }}</option>
                        
                    </select>                    

                    
                    <br/>

                    <input v-model="screens.signup.form.email" type="email" placeholder="Email (optional)" />

                    <br/>
                    
                    <input v-model="screens.signup.form.website" type="url" placeholder="Website (optional)" />

                    <br/>

                    <input v-model="screens.signup.form.photo" type="url" placeholder="Photo (optional)" />

                    <br/>

                    <button type="submit">SUBMIT</button>

                </form>

            </div>


            <div id="developers" class="ui-segment" v-if="screens.developers.display">

                <h1>!Software Developer Rankings!</h1>

                <div v-for="(location, index) in Object.keys(locations)" :key="index"> 

                    <h2 style="color:black;">{{ index+1 }}. {{ location }}</h2>

                    <ol style="line-height: 1.55;">

                        <li v-for="(city, index) in locations[location].cities" :key="index">{{ city }}</li>

                    </ol>

                    <div style="padding-bottom:15px;"></div>

                    <div v-if="index < Object.keys(locations).length-1" style="border-bottom:2px dashed white;"></div>
                    
                </div>

            </div>     


            <div id="profile" class="ui-segment" v-if="screens.profile.display">

                <h1>Profile</h1>

            </div>     


            <div id="settings" class="ui-segment" v-if="screens.settings.display">

                <h1>Settings</h1>

            </div>
        
        </transition-group>

    </div>

</template>

<script>

import { mapState } from 'vuex';
import { axios } from 'axios';

export default 
{
    name: 'DevNation',

    computed: 
    {
        ...mapState(['showNav'])
    },

    data() 
    {
        return {
            screens: 
            {
                login: 
                {
                    display: false,
                    form: 
                    {
                        username: '',
                        password: '',
                    }
                },

                signup: 
                {
                    display: true,
                    form: 
                    {
                        username: '',
                        password: '',
                        email: '',
                        state: '',
                        city: '',
                        website: '',
                        photo: '',
                    }                    
                },

                developers: 
                {
                    display: false
                },

                profile: 
                {
                    display: false
                },

                settings: 
                {
                    display: false
                }
            },
            
            locations: 
            {
                Arizona: 
                {
                    cities: [
                        'Flagstaff',
                        'Phoenix',
                        'Tucscon',
                    ]
                },
                California: 
                {
                    cities: [
                        'Los Angeles',
                        'Sacramento',
                        'San Diego',
                        'San Francisco',
                        'San Jose',
                    ]
                },
                Colorado: 
                {
                    cities: [
                        'Denver',
                        'Colorado Springs'
                    ]
                },
                Kansas: 
                {
                    cities: [
                        'Kansas City'
                    ]
                },
                Nevada: 
                {
                    cities: [
                        'Las Vegas',
                        'Reno'
                    ]
                },
                New_Mexico: 
                {
                    cities: [
                        'Albuquerque',
                        'Santa Fe'
                    ]
                },
                Oklahoma: 
                {
                    cities: [
                        'Oklahoma City'
                    ]
                },
                Oregon: 
                {
                    cities: [
                        'Portland'
                    ]
                },
                Texas: 
                {
                    cities: [
                        'Austin',
                        'Dallas',
                        'Houston',
                        'San Antonio'
                    ]
                },
                Utah: 
                {
                    cities: [
                        'Salt Lake City'
                    ]
                },
                Washington: 
                {
                    cities: [
                        'Seattle'
                    ]
                },
            },

        }
    },

    beforeCreate()
    {

    }, 

    created()
    {
        if (this.$route.path === '/dev-nation') 
        {
            this.$store.dispatch('showNav', false); // hide EasyPay navbar
        }
    },

    beforeMount()
    {

    },

    mounted() 
    {
        this.FullScreen();
    },

    updated() 
    {

    },

    methods:  
    {
        /**
         * Set web browser screen height.
         */
        FullScreen() 
        {
            const ui = document.getElementById('dev-nation-ui');

            ui.style.height = `${Math.floor(window.innerHeight)}px`;

            window.addEventListener('resize', () => 
            {
                ui.style.height = `${Math.floor(window.innerHeight)}px`;
            }, 
            true);
        },

        /**
         * Switch between screens available.
         * 
         * @param {*} screen_name 
         */
        ToggleScreen(screen_name)
        {
            Object.keys(this.screens).forEach(screen => 
            {
                this.screens[screen].display = (screen === screen_name) ? true : false;
            });
        },

        /**
         * Request a Login response from API.
         * 
         */
        async Login()
        {
            try 
            {
                console.log(this.screens.login.form);

                const api_login_response = await axios.post('/dev-login', this.screens.login.form);

                console.log(api_login_response);
            }
            catch (error)
            {
                console.error(error);
            }
        },

        /**
         * Submit a new Signup request to API. 
         */
        async Signup()
        {
            try 
            {
                console.log(this.screens.signup.form);

                const api_signup_response = await axios.post('/dev-signup', this.screens.signup.form);

                console.log(api_signup_response);
            }
            catch (error)
            {
                console.error(error);
            }
        },

        /**
         * Select a State to display its cities for user input.
         * 
         * @param {*} event 
         */
        SelectState(event)
        {
            this.screens.signup.state = event.target.value; 

            this.screens.signup.city = ''; 
        },

    }, 
}
</script>

<style scoped>

#dev-nation-ui 
{
    background: dodgerblue;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    overflow-x: hidden;
}

.ui-segment
{
    color: white;
    padding: 5px;
}

#navbar 
{
    border-bottom: 2px dashed white;
    text-align: center;
}

.screen 
{
    color: black;
    transition: all 0.15s ease;
}

    .screen:hover 
    {
        color: white;
        cursor: pointer;
    }

.screen-active 
{
    color: white;
}

.screen-enter-active
{
    transition: all 0.5s ease;
}

.screen-leave-active 
{
}

.screen-enter-from
{
    opacity: 0;
    transform: translateY(-30px);
}

.screen-leave-to
{
}

#login 
{
    text-align: center;
}

#signup 
{
    text-align: center;
}

#developers 
{
    max-height: 400px;
}

h1 
{
    color:black; 
    text-align:center;
    text-decoration:underline; 
}

</style>