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

                    <input v-model="screens.signup.form.username" type="text" placeholder="New Username" required />

                    <br/>

                    <input v-model="screens.signup.form.password" type="text" placeholder="New Password" required />

                    <br/><br/>
                    
                    <select v-model="screens.signup.form.state" required @change="SelectSignupState">
                        
                        <option value='' disabled selected> State Residence </option>
                        
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

                        <input v-model="screens.signup.form.school" placeholder="School Name" required />

                        <input v-model="screens.signup.form.major" placeholder="Degree Major" required />

                    </section>                    

                    <br/>

                    <select v-model="screens.signup.form.experienceLevel" @change="SelectSignupExperienceLevel">

                        <option value='' disabled selected> Experience Level </option>

                        <option>Entry Level (0-2 years)</option>

                        <option>Mid Level (2-5 years)</option>

                        <option>Senior Level (5+ years)</option>

                    </select>

                    <br/><br/>

                    <input v-model="screens.signup.form.email" type="email" placeholder="(optional) Email @" />

                    <br/>
                    
                    <input v-model="screens.signup.form.website" type="url" placeholder="(optional) Website https://" />

                    <br/>    

                    <input v-model="screens.signup.form.photo" type="url" placeholder="(optional) Photo https://" />

                    <br/>

                    <img v-if="screens.signup.form.photo" :src="screens.signup.form.photo" class="signup-photo" target="_blank" />

                    <br/>

                    Work History <button @click.prevent="AddWorkHistory()"> Add </button>

                    <br/><br/>

                    <div v-for="(work, workHistory_index) in screens.signup.form.workHistory" :key="workHistory_index">
                        
                        <input v-model="work.employer_name" placeholder="Employer Name"/> 

                        <input v-model="work.position_name" placeholder="Position Name"/>
                        
                        <button @click.prevent="RemoveWorkHistory(workHistory_index)"> Remove </button>

                        <br/>

                        <select v-model="work.startMonth" required>

                            <option value="" disabled selected> Start Month </option>

                            <option v-for="(workStartMonth, startDateMonth_index) in dates.months" :key="startDateMonth_index" :value="workStartMonth">

                                {{ workStartMonth }}

                            </option>

                        </select>

                        <select v-model="work.startYear" required>

                            <option value="" disabled selected> Start Year </option>

                            <option v-for="(workStartYear, workStartYear_index) in dates.years" :key="workStartYear_index" :value="workStartYear.toString()">

                                {{ workStartYear.toString() }}

                            </option>

                        </select>

                        <br/>

                        <select v-model="work.endMonth" required>

                            <option value="" disabled selected> End Month </option>

                            <option v-for="(workEndMonth, endDateMonth_index) in dates.months" :key="endDateMonth_index" :value="workEndMonth">

                                {{ workEndMonth }}

                            </option>

                        </select>

                        <select v-model="work.endYear" required>

                            <option value="" disabled selected> End Year </option>

                            <option v-for="(workEndYear, workEndYear_index) in dates.years" :key="workEndYear_index" :value="workEndYear.toString()">

                                {{ workEndYear.toString() }}

                            </option>

                        </select>   

                        <br/><br/>

                    </div>   

                    Project History <button @click.prevent="AddProjectHistory()"> Add </button>

                    <br/><br/>

                    <div v-for="(project, projectHistory_index) in screens.signup.form.projectHistory" :key="projectHistory_index">

                        <input v-model="project.project_name" placeholder="Project Name"/>

                        <input v-model="project.project_website" placeholder="(optional) Website"/>

                        <button @click.prevent="RemoveProjectHistory(projectHistory_index)"> Remove </button>

                        <br/>

                        <select v-model="project.startMonth" required>

                            <option value="" disabled selected> Start Month </option>

                            <option v-for="(projectStartMonth, index) in dates.months" :key="index" :value="projectStartMonth">

                                {{ projectStartMonth }}

                            </option>

                        </select>

                        <select v-model="project.startYear" required>

                            <option value="" disabled selected> Start Year </option>

                            <option v-for="(projectStartYear, projectStartYear_index) in dates.years" :key="projectStartYear_index" :value="projectStartYear.toString()">

                                {{ projectStartYear.toString() }}

                            </option>

                        </select>

                        <br/>

                        <select v-model="project.endMonth" required>

                            <option value="" disabled selected> End Month </option>

                            <option v-for="(projectEndMonth, index) in dates.months" :key="index" :value="projectEndMonth">

                                {{ projectEndMonth }}

                            </option>

                        </select>

                        <select v-model="project.endYear" required>

                            <option value="" disabled selected> End Year </option>

                            <option v-for="(projectEndYear, projectEndYear_index) in dates.years" :key="projectEndYear_index" :value="projectEndYear.toString()">

                                {{ projectEndYear.toString() }}

                            </option>

                        </select>

                        <!--<select v-show="false" v-model="project.skills" multiple @change="SkillSelection($event, project.skills)">

                            <option value="" disabled selected> Choose Skills </option>

                            <option value="C#"> C# </option>

                            <option value="Java"> Java </option>

                            <option value="JavaScript"> JavaScript </option>

                            <option> Vue </option>

                            <option> React </option>

                            <option> Angular </option>

                            <option> SQL Server </option>

                        </select>-->
                        
                        <br/><br/>

                    </div>

                    <button type="submit"> SUBMIT </button>

                    <button @click.prevent="DebugVariables"> Debug </button>

                    <br/><br/>

                </form>

            </div>

            <div id="developers" class="ui-segment" v-if="screens.developers.display">

                <h1 style="font-size:larger; text-decoration:none;">
                    
                    <span style="color:yellow;">¡</span>Software Developer 
                    
                    <span style="color:blue;">U</span><span style="color:white;">.</span><span style="color:red;">S</span> 
                    
                    <span style="color:yellow;"> [ </span>
                    
                    <span style="color:white;">
                    
                        Top <img v-if="this.screens.developers.loadingGif" src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" class="loading-gif"/> 
                        
                        {{ screens.developers.top100.length > 0 ? screens.developers.top100.length : '' }}
                    
                    </span>
                    
                    <span style="color:yellow;"> ] </span> 
                    
                    Rankings<span style="color:yellow;">!</span>
                
                </h1>

                <div v-for="(location, index) in Object.keys(locations)" :key="index"> 

                    <div v-if="screens.developers.top100.filter(developer => developer.state === location).length > 0"> 

                        <h1 style="color:blue; text-align:center;">

                            {{ location }}

                        </h1>

                        <ol style="line-height:2; list-style-type:none; padding:0;">

                            <li v-for="(city, index) in locations[location].cities" :key="index">

                                <div v-if="screens.developers.top100.filter(developer => developer.city === city).length > 0" style="margin-bottom:15px;">  

                                    <h3 class="city-name">
                                        
                                        {{ city }}

                                        ( <span style="color:white;">Top {{ screens.developers.top100.filter(developer => developer.city === city).length }}</span> )
                                    
                                    </h3>

                                    <ol v-if="screens.developers.top100" style="line-height:2; list-style-type:lower-roman; padding-inline-start:0px;">

                                        <li v-for="(developer, index) in screens.developers.top100.filter(e => e.city === city)" :key="index" style="color:red;">

                                            <div class="developer-card" style="color:black; padding:10px;">

                                                <img :src="developer.photo !== null ? developer.photo : 'https://icons.veryicon.com/png/o/miscellaneous/xdh-font-graphics-library/anonymous-user.png'" class="signup-photo" style="background:white; width:100px;"/>  

                                                <br/>
                                                
                                                <span style="color:white;">

                                                    {{ developer.username.toUpperCase() }}
                                                
                                                </span> 
                                                
                                                <br/>
                                                
                                                <span v-for="(property, dev_index) in Object.keys(developer)" :key="dev_index">

                                                    <span v-if="developer[property] && property !== 'id' 
                                                                                    && property !== 'password' 
                                                                                    && property !== 'username' 
                                                                                    && property !== 'photo'
                                                                                    ">
                                                        
                                                        <!-- {{ property.charAt(0).toUpperCase() + property.slice(1) }}:  -->
                                                        
                                                        <span style="color:black;">
                                                            
                                                            <a v-if="property === 'website'" :href="developer[property]" class="dev-website" target="_blank">
                                                                
                                                                {{ developer[property] }}

                                                                <br/>
                                                            
                                                            </a>

                                                            <div v-else-if="property === 'workHistory'">
                                                                
                                                                <ul v-if="developer[property].length > 0" style="padding-left:0px; list-style-type:none;">

                                                                    <span style="color:white;"> {{ property.charAt(0).toUpperCase() + property.slice(1) }} </span> 

                                                                    <li v-for="(devWorkHistory, workHistory_index) in developer[property]" :key="workHistory_index">

                                                                        <span style="color:blue;"> {{ devWorkHistory.position_name }} </span> <span style="color:white"> | </span>  

                                                                        {{ devWorkHistory.employer_name }} <span style="color:white"> | </span> 

                                                                        {{ devWorkHistory.startMonth.substring(0,3) }}'{{ devWorkHistory.startYear.toString().substring(2) }} <span style="color:white;">--></span> {{ devWorkHistory.endMonth.substring(0,3) }}'{{ devWorkHistory.endYear.toString().substring(2) }}

                                                                    </li>

                                                                </ul>

                                                            </div>

                                                            <div v-else-if="property === 'projectHistory'">

                                                                <ul v-if="developer[property].length > 0" style="padding-left:0px; list-style-type:none;">
                                                                    
                                                                    <span style="color:white;"> {{ property.charAt(0).toUpperCase() + property.slice(1) }} </span> 

                                                                    <li v-for="(devProjectHistory, projectHistory_index) in developer[property]" :key="projectHistory_index">

                                                                        {{ devProjectHistory.project_name }} <span style="color:white"> | </span> 

                                                                        <a :href="devProjectHistory.project_website" class="dev-website" target="_blank">
                                                                            
                                                                            {{ devProjectHistory.project_website }}
                                                                        
                                                                        </a> 
                                                                        
                                                                        <span style="color:white"> | </span> 

                                                                        {{ devProjectHistory.startMonth.substring(0,3) }}'{{ devProjectHistory.startYear }} <span style="color:white;">--></span> {{ devProjectHistory.endMonth.substring(0,3) }}'{{ devProjectHistory.endYear }}

                                                                    </li>

                                                                </ul>

                                                            </div>

                                                            <span v-else> {{ developer[property] }} <br/> </span>
                                                        
                                                        </span>
                                                    
                                                    </span>

                                                </span>                                         

                                            </div>

                                        </li>

                                    </ol>

                                </div>

                            </li>

                        </ol>

                    </div>                    
                    
                </div>

                <div style="padding-bottom:15px;"></div>

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

                        experienceLevel: '',
                        workHistory: [],
                        projectHistory: [],
                    }                    
                },

                developers: 
                {
                    display: true,
                    top100: [],
                    loadingGif: true,
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

            dates: 
            {
                months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
            },
            years: null,
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

        this.screens.developers.loadingGif = false;

        // console.log(this.screens.developers.top100) // debug 

        this.dates.years = this.GetYearsRange();
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
                console.log(this.screens.signup.form) // debug 

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

        /**
         * Open a new work history form for the user.
         */
        AddWorkHistory()
        {
            this.screens.signup.form.workHistory.push(
                {
                    Id: 0,
                    position_name: '',
                    employer_name: '',
                    startMonth: '',
                    startYear: '',
                    endMonth: '',
                    endYear: ''
                }
            );
        },

        /**
         * Remove current element from work history on signup form.
         * @param {*} element 
         */
        RemoveWorkHistory(element)
        {
            if (confirm("Are you sure you want to delete?"))
            {
                this.screens.signup.form.workHistory.splice(element, 1);
            }            
        },

        /**
         * Add an element to project history on signup form.
         */
        AddProjectHistory()
        {
            this.screens.signup.form.projectHistory.push(
                {
                    Id: 0,
                    project_name: '',
                    project_website: '',
                    startMonth: '',
                    startYear: '',
                    endMonth: '',
                    endYear: '',
                    skills: [],
                }
            );
        },

        /**
        * Remove current element from project history on signup form.
        * @param {*} element 
        */
        RemoveProjectHistory(element)
        {
            if (confirm("Are you sure you want to delete?"))
            {
                this.screens.signup.form.projectHistory.splice(element, 1);
            }            
        },

        /**
         * 
         * @param {*} event 
         * @param {*} eSkills 
         */
        SkillSelection(event, eSkills)
        {
            console.log(event) // debug

            console.log(eSkills) // debug 

            const skillSelected = Array.from(event.target.selectedOptions).map(option => option.value); 

            console.log(skillSelected) // debug
        },

        /**
         * 
         */
        DebugVariables()
        {
            console.log(this.screens.signup); // debug
        },

        /**
         * 
         */
        GetYearsRange()
        {
            var years = []; 

            for (let y = 2000; y < 2025; y++) 
            {
                years.push(y); 
            }

            return years;
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
    border: 2px solid white;
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

.dev-website
{
    font-size: medium;
}

    .dev-website:hover
    {
        color: purple;
    }

.developer-card
{    
    border-radius: 8px;
    margin: 15px 6px; 
    transition: all 0.12s ease; 
}

    .developer-card:hover
    {
        border: 2px solid white;
        box-shadow: black 0px 3px 10px;
    }

h1 
{
    color:black; 
    text-align:center;
    text-decoration:underline; 
}

.loading-gif
{
    width: 25px;
}

.city-name 
{
    border-bottom:2px dashed red;
    color: red; 
    text-align: center;
}

@media(max-width:600px)
{
    #dev-nation-ui
    {        
        font-size: small;
    }
}

</style>