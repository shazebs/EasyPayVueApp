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

                    <input v-model="screens.login.username" type="text" placeholder="Username" required />

                    <br />

                    <input v-model="screens.login.password" type="password" placeholder="Password" required />

                    <br />

                    <button type="submit"> Submit </button>

                </form>

            </div>


            <div id="signup" class="ui-segment" v-if="screens.signup.display">

                <h1>Signup</h1>

            </div>


            <div id="developers" class="ui-segment" v-if="screens.developers.display">

                <h1>Developers</h1>

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
//import { axios } from 'axios';

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
                    username: '',
                    password: '',
                },

                signup: 
                {
                    display: false
                },

                developers: 
                {
                    display: true
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

        Login()
        {
            alert('Login submit clicked!');
        }
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

#developers 
{
    
}

</style>