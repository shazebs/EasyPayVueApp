<template>

    <div id="dev-nation-ui">

        <div id="navbar" class="ui-segment">
 
            <span v-for="(screen, index) in Object.keys(screens)" :key="index">

                <span @click="ToggleScreen(screen)" class="screen" :class="screens[screen].display ? 'screen-active' : ''">
                    
                    {{ screen }}
                
                </span>

                <span v-if="index < Object.keys(screens).length-1"> - </span>

            </span> 
            
        </div>

        <transition-group name="screen" tag="div">

            <div id="login" class="ui-segment" v-if="screens.login.display">

                <h1>Login</h1>

                <form @submit.prevent="Login()">

                    <input v-model="screens.login.form.username" type="text" placeholder="Username" required />

                    <br/>

                    <input v-model="screens.login.form.password" type="password" placeholder="Password" required />

                    <br/><br/>

                    <button type="submit"> SUBMIT </button>

                </form>

            </div>

            <div id="signup" class="ui-segment" v-if="screens.signup.display">

                <h1>Signup</h1>

                <form @submit.prevent="Signup()">

                    <input v-model="screens.signup.form.username" type="text" placeholder="Username" required />

                    <br/>

                    <input v-model="screens.signup.form.password" type="text" placeholder="Password" required />

                    <br/><br/>
                    
                    <select v-model="screens.signup.form.state" required @change="SelectSignupState">
                        
                        <option value='' disabled selected> Location </option>
                        
                        <option v-for="(state, index) in Object.keys(locations)" :key="index" :value='state'>
                            
                            {{ state }}
                        
                        </option>
                        
                    </select>
                    
                    <br/>
                    
                    <select v-if="screens.signup.form.state !== ''" v-model="screens.signup.form.city" required>
                        
                        <option value='' disabled selected> Nearest City </option>
                        
                        <option v-for="(city, index) in locations[screens.signup.form.state].cities" :key="index">
                            
                            {{ city }}
                        
                        </option>
                        
                    </select>    
                    
                    <br v-if="screens.signup.form.state !== ''" /><br/>
                           
                    <select v-model="screens.signup.form.education" @change="SelectSignupEducation" required>
                        
                        <option value='' disabled selected> Highest Education </option>
                        
                        <option> No Degree </option>

                        <option> Associate's Degree </option>

                        <option> Bachelor's Degree </option>

                        <option> Master's Degree </option>

                        <option> PhD </option>
                        
                    </select>

                    <br/>
                    
                    <section v-if="screens.signup.form.education !== '' && screens.signup.form.education !== 'No Degree'">

                        <input v-model="screens.signup.form.school" placeholder="School" required />

                        <br/>

                        <input v-model="screens.signup.form.major" placeholder="Major" required />

                    </section>                    

                    <br/>

                    <select v-model="screens.signup.form.experience" @change="SelectSignupExperienceLevel">

                        <option value='' disabled selected> Experience Level</option>

                        <option>Entry Level (0-2 years)</option>

                        <option>Mid Level (2-5 years)</option>

                        <option>Senior Level (5+ years)</option>

                    </select>

                    <br/><br/>

                    <input v-model="screens.signup.form.email" type="email" placeholder="(optional) Email" />

                    <br/>
                    
                    <input v-model="screens.signup.form.website" type="url" placeholder="(optional) Website" />

                    <br/>    

                    <input v-model="screens.signup.form.photo" type="url" placeholder="(optional) Photo" />

                    <br/>

                    <img v-if="screens.signup.form.photo !== ''" :src="screens.signup.form.photo" class="signup-photo" target="_blank" />

                    <br/>

                    <button type="submit"> SUBMIT </button>

                </form>

            </div>

            <div id="developers" class="ui-segment" v-if="screens.developers.display">

                <h1><span style="color:white;">¡</span>Software Developer <span style="color:blue;">U</span><span style="color:white;">.</span><span style="color:red;">S</span> Rankings<span style="color:white;">!</span></h1>

                <div v-for="(location, index) in Object.keys(locations)" :key="index"> 

                    <h2 style="color:black;">

                        {{ index+1 }}. {{ location }}

                    </h2>

                    <ol style="line-height:2; list-style-type:none;">

                        <li v-for="(city, index) in locations[location].cities" :key="index">
                            
                            <span style="color:blue; text-decoration:underline;">
                                
                                <span class="city">{{ city }}</span>
                            
                            </span>

                            <ol v-if="screens.developers.top100" style="line-height:2; list-style-type:lower-roman;">

                                <li v-for="(developer, index) in screens.developers.top100.filter(e => e.city === city)" :key="index" style="color:red;">

                                    <img :src="developer.photo !== null ? developer.photo : 'https://icons.veryicon.com/png/o/miscellaneous/xdh-font-graphics-library/anonymous-user.png'" class="signup-photo" style="width:100px;"/>  
                                    
                                    <br/>

                                    <span style="color:black;">
                                        
                                        <span style="color:white;">

                                            {{ developer.username.toUpperCase() }}
                                        
                                        </span> 
                                        
                                        <br/>
                                        
                                        <span v-for="(property, dev_index) in Object.keys(developer)" :key="dev_index">

                                            <span v-if="developer[property] && property !== 'id' 
                                                                            && property !== 'password' 
                                                                            && property !== 'username' 
                                                                            && property !== 'photo'">
                                                
                                                {{ property.charAt(0).toUpperCase() + property.slice(1) }}: 
                                                
                                                <span style="color:antiquewhite;">
                                                    
                                                    <a v-if="property === 'website'" :href="developer[property]" class="dev-website" target="_blank">
                                                        
                                                        {{ developer[property] }}
                                                    
                                                    </a>

                                                    <span v-else> {{ developer[property] }} </span>
                                                
                                                </span>
                                                
                                                <br/>
                                            
                                            </span>

                                        </span>                                         

                                    </span>

                                </li>

                            </ol>
                        
                        </li>

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
import axios from 'axios';

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
                    display: false,
                    form: 
                    {
                        id: null,
                        username: '',
                        password: '',
                        state: '',
                        city: '',
                        email: null,
                        website: null,
                        photo: null,
                        education: '',
                        school: null,
                        major: null,
                        experience: '',
                    }                    
                },

                developers: 
                {
                    display: true,
                    top100: []
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
                    ],
                },
                California: 
                {
                    cities: [
                        'Los Angeles',
                        'Sacramento',
                        'San Diego',
                        'San Francisco',
                        'San Jose',
                    ],
                },
                Colorado: 
                {
                    cities: [
                        'Denver',
                        'Colorado Springs'
                    ],
                },
                Kansas: 
                {
                    cities: [
                        'Kansas City'
                    ],
                },
                Nevada: 
                {
                    cities: [
                        'Las Vegas',
                        'Reno'
                    ],
                },
                New_Mexico: 
                {
                    cities: [
                        'Albuquerque',
                        'Santa Fe'
                    ],
                },
                Oklahoma: 
                {
                    cities: [
                        'Oklahoma City'
                    ],
                },
                Oregon: 
                {
                    cities: [
                        'Portland'
                    ],
                },
                Texas: 
                {
                    cities: [
                        'Austin',
                        'Dallas',
                        'Houston',
                        'San Antonio'
                    ],
                },
                Utah: 
                {
                    cities: [
                        'Salt Lake City'
                    ],
                },
                Washington: 
                {
                    cities: [
                        'Seattle'
                    ],
                },
            },

        }
    },

    beforeCreate()
    {

    }, 

    /**
     * Bind data before DOM elements are created.
     */
    async created()
    {
        if (this.$route.path === '/dev-nation') 
        {
            this.$store.dispatch('showNav', false);
        }

        this.screens.developers.top100 = await this.GetTop100Developers();
    },

    beforeMount()
    {

    },

    /**
     * Functionality after DOM elements have been created.
     */
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
         */
        async Login()
        {
            try 
            {
                const api_login_response = await axios.post('dev-login', this.screens.login.form);

                if (api_login_response.data.developer !== null)
                {
                    alert('Login SUCCESS');
                }
                else 
                {
                    alert('Login FAILED');
                }
                
                console.log('api_login_response[developer]', api_login_response.data.developer); // debug 
            }
            catch (error)
            {
                console.error(error); // debug 

                alert('Login ERROR');
            }
        },

        /**
         * Submit a new Signup request to API. 
         */
        async Signup()
        {
            try 
            {
                const api_signup_response = await axios.post('dev-signup', this.screens.signup.form);

                alert(`Signup ${(api_signup_response.data.signup_success.result) ? 'SUCCESS' : 'FAILED' }`);
            }
            catch (error)
            {
                console.error(error); // debug 

                alert('Signup ERROR'); 
            }
        },

        /**
         * Select a State to display its cities for user input.         * 
         * @param {*} event 
         */
        SelectSignupState(event)
        {
            this.screens.signup.state = event.target.value; 
        },

        /**
         * Get first 100 records of Developers from API.
         */
        async GetTop100Developers()
        {
            try 
            {
                const getTop100Developers_api_response = await axios.get('dev-top100');

                return getTop100Developers_api_response.data; 
            }
            catch (error)
            {
                console.error(error); // debug
            }
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
    transition: all 0.15s ease-in;
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
    transform: translateY(30px);
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

.signup-photo
{
    border: 3px solid white;
    border-radius: 100px; 
    margin: 10px 0px;
    transition: all 0.1s ease-out;
    width: 200px;
}

    .signup-photo:hover 
    {
        box-shadow: black 0px 3px 5px;
        cursor: pointer;
    }

#developers 
{
    max-height: 400px;
}

.city:hover 
{
    color:white;
}

.dev-website 
{
    color: rebeccapurple;
}

.dev-website:hover
{
    color: purple;
}

h1 
{
    color:black; 
    text-align:center;
    text-decoration:underline; 
}

</style>