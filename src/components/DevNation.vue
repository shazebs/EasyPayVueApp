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

            <div id="developers" class="ui-segment" v-if="screens.developers.display" style="padding:0px;">

                <h1 style="font-size:larger; text-decoration:none; padding:5px 0px; background:dodgerblue;">
                    
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

                <div style="display:flex; flex-wrap:wrap; justify-content:center; align-items:center;">

                    <div v-for="(developer, index) in screens.developers.top100" :key="index">

                        <div class="developer-card" style="color:black; padding:10px;">
                                                    
                            <div style="display:flex; flex-direction:row;">

                                <section style="display:flex; align-items:center;">
                                    
                                    <img :src="developer.photo !== null ? developer.photo : 'https://icons.veryicon.com/png/o/miscellaneous/xdh-font-graphics-library/anonymous-user.png'" class="signup-photo" style="background:white; min-width:100px; width:100px; margin:0px;"/>  

                                </section>

                                <section style="overflow-x:hidden; width:100%; align-items:center; justify-content:center; display:flex; flex-direction:column; padding: 0px 5px;">

                                    <div style="width:100%; display:flex; align-items:center;">

                                        <div :id="(`dev-exp-${developer.id}`)" class="experience-bar"
                                            style="background:limegreen; 
                                                display:flex; 
                                                flex-direction:row; 
                                                flex-wrap:nowrap; 
                                                justify-content:center;
                                                align-items:center;
                                                height:30px; 
                                                overflow-x:hidden; 
                                                overflow-y:hidden; 
                                                text-align:right;"> 
                                        
                                            <span v-if="developer.expYrs >= 5">{{ developer.expYrs }} yrs. </span>

                                            &nbsp;
                                            
                                            <span v-if="developer.expYrs >= 5 && developer.expMos > 0">{{ developer.expMos }} mos. </span>                                                                                                   

                                        </div> 

                                        <span v-if="developer.expYrs > 0 && developer.expYrs < 5"> &nbsp;  {{ developer.expYrs }} yrs. </span>

                                        <span v-if="developer.expYrs >= 0 && developer.expYrs < 5 && developer.expMos > 0"> &nbsp; {{ developer.expMos }} mos. </span> 

                                    </div>    

                                </section>

                            </div>        
                            
                            <div style="color:white; margin-top:10px; margin-bottom:4px;">
                                
                                <span style="color:#8FFF1F">RANKED <span style="font-size:x-large;">#{{ index + 1 }}</span></span> <br/>

                                <span style="font-size:larger;"> {{ developer.username.toUpperCase() }} </span>
                                
                                <span style="color:black; font-size:small;"> 
                                    
                                    <br/>
                                    
                                    📍 near <span style="color:white;">{{ developer.city }}<span style="color:white;">, </span>
                                    
                                    {{ developer.state }}</span><span style="color:black;"></span>

                                </span>
                            
                            </div>                                          

                            <div v-if="developer.education !== 'No Degree'" style="font-size:small; line-height:1.4;">

                                🎓 <span style="font-weight:bolder;">{{ developer.education }}</span> in <span style="font-weight:bolder;">{{ developer.major }}</span>
                                
                                <br/>
                                
                                <span style="padding-left:22px;">from {{ developer.school }} 🏫 </span>

                            </div>
                            
                            <span v-for="(property, dev_index) in Object.keys(developer)" :key="dev_index">

                                <span v-if="developer[property] && property !== 'id' 
                                                                && property !== 'password' 
                                                                && property !== 'username' 
                                                                && property !== 'photo'
                                                                && property !== 'city'
                                                                && property !== 'state'
                                                                && property !== 'education'
                                                                && property !== 'school'
                                                                && property !== 'major'
                                                                && property !== 'email'
                                                                && property !== 'experienceLevel'
                                                                && property !== 'expStats'
                                                                && property !== 'expYrs'
                                                                && property !== 'expMos'
                                                                ">
                                    
                                    <!-- {{ property.charAt(0).toUpperCase() + property.slice(1) }}:  -->
                                    
                                    <span style="color:black; font-size:small;">
                                        
                                        <div v-if="property === 'website'">
                                            
                                            🌐 <a :href="developer[property]" class="dev-website" target="_blank">
                                            
                                            {{ developer[property] }}
                                        
                                            </a>

                                        </div>    

                                        <div v-else-if="property === 'workHistory'">
                                            
                                            <ul v-if="developer[property].length > 0" style="padding-left:0px; list-style-type:none;">

                                                <div style="border-bottom:2px dashed white; color:white;"> {{ property.charAt(0).toUpperCase() + property.slice(1) }} 
                                                    
                                                    <span style="color:black;"> ( </span>
                                                        
                                                    <span style="color:red; font-size:medium;"> {{ developer.workHistory.length }} </span> 
                                                    
                                                    <span style="color:black;"> ) </span>
                                                    
                                                    <span style="color:black;"> 
                                                        
                                                        <span style="color:white;;"> --> </span> 
                                                                
                                                        <span style="color:blue;">
                                                        
                                                            <span v-if="developer.expYrs > 0"> {{ developer.expYrs }} yrs. </span>
                                                            
                                                            <span v-if="developer.expMos > 0">{{ developer.expMos }} mos. </span> 

                                                        </span>

                                                    </span>
                                                
                                                </div> 

                                                <li v-for="(devWorkHistory, workHistory_index) in developer[property]" :key="workHistory_index" style="line-height:1.3; margin:6px 0px;">

                                                    {{ devWorkHistory.employer_name }} 
                                                    
                                                    <br/>

                                                    <span style="font-weight:bolder;"> {{ devWorkHistory.position_name }} </span> 
                                                    
                                                    <span style="color:white"> | </span>
                                                    
                                                    <span v-if="devWorkHistory.yearDiff > 0">{{ devWorkHistory.yearDiff }} yrs. </span>{{ devWorkHistory.monthDiff }} mos. 
                                                    
                                                    <span style="color:white"> | </span> 

                                                    {{ devWorkHistory.startMonth.substring(0,3) }}'{{ devWorkHistory.startYear.toString().substring(2) }} 
                                                    
                                                    <span style="color:white;">--></span> 
                                                    
                                                    {{ devWorkHistory.endMonth.substring(0,3) }}'{{ devWorkHistory.endYear.toString().substring(2) }}

                                                </li>

                                            </ul>

                                        </div>

                                        <div v-else-if="property === 'projectHistory'">

                                            <ul v-if="developer[property].length > 0" style="padding-left:0px; list-style-type:none;">
                                                
                                                <div style="border-bottom:2px dashed white; color:white;"> {{ property.charAt(0).toUpperCase() + property.slice(1) }} 
                                                    
                                                    <span style="color:black;"> ( </span>
                                                    
                                                    <span style="color:white;"> {{ developer.projectHistory.length }} </span> 

                                                    <span style="color:black;"> ) </span>

                                                </div> 

                                                <li v-for="(devProjectHistory, projectHistory_index) in developer[property]" :key="projectHistory_index" style="line-height:1.3; margin:6px 0px;">

                                                    <span style="font-weight:bolder;">{{ devProjectHistory.project_name }}</span> 

                                                    <br/>

                                                    <span v-if="devProjectHistory.project_website">

                                                        <a :href="devProjectHistory.project_website" class="dev-website" target="_blank">
                                                        
                                                            {{ devProjectHistory.project_website }}
                                                    
                                                        </a> 
                                                    
                                                        <span style="color:white"> | </span> 

                                                    </span>

                                                    {{ devProjectHistory.startMonth.substring(0,3) }}'{{ devProjectHistory.startYear }} 

                                                    <span style="color:white;">--></span> 
                                                    
                                                    {{ devProjectHistory.endMonth.substring(0,3) }}'{{ devProjectHistory.endYear }}

                                                </li>

                                            </ul>

                                        </div>

                                        <span v-else> {{ developer[property] }} <br/> </span>
                                    
                                    </span>
                                
                                </span>

                            </span>                                         

                        </div>

                    </div>
                </div>

                <!-- DEPRECATED -->
                <div v-show="false" v-for="(location, index) in Object.keys(locations)" :key="index">

                    <div v-if="screens.developers.top100.filter(developer => developer.state === location).length > 0">

                        <h1 style="color:blue; text-align:center;">

                            {{ location }}

                        </h1>

                        <ol style="line-height:2; list-style-type:none; padding:0; margin-top:0px;">

                            <li v-for="(city, index) in locations[location].cities" :key="index">

                                <div v-if="screens.developers.top100.filter(developer => developer.city === city).length > 0" style="margin-bottom:15px;">

                                    <h3 class="city-name" style="margin:0px;">
                                        
                                        <span style="color:white;"> {{ city }} </span>

                                        ( <span style="color:white;">Top {{ screens.developers.top100.filter(developer => developer.city === city).length }}</span> )
                                    
                                    </h3>

                                    <ol v-if="screens.developers.top100" style="line-height:2; list-style-type:lower-roman; padding-inline-start:0px;">

                                        <li v-for="(developer, index) in screens.developers.top100.filter(e => e.city === city)" :key="index" style="color:red;">

                                            <div class="developer-card" style="color:black; padding:10px;">
                                                
                                                <div style="display:flex; flex-direction:row;">

                                                    <section style="display:flex; align-items:center;">
                                                        
                                                        <img :src="developer.photo !== null ? developer.photo : 'https://icons.veryicon.com/png/o/miscellaneous/xdh-font-graphics-library/anonymous-user.png'" class="signup-photo" style="background:white; min-width:100px; width:100px; margin:0px;"/>  

                                                    </section>

                                                    <section style="background:transparent; overflow-x:hidden; width:100%; align-items:center; display:flex; padding: 0px 5px;">

                                                        <div :id="(`dev-exp-${developer.id}`)" class="experience-bar"
                                                             style="background:limegreen; 
                                                                    border-radius:4px;
                                                                    display:flex; 
                                                                    flex-direction:row; 
                                                                    flex-wrap:nowrap; 
                                                                    justify-content:center;
                                                                    align-items:center;
                                                                    height:30px; 
                                                                    overflow-x:hidden; 
                                                                    overflow-y:hidden; 
                                                                    text-align:right;"> 
                                                            
                                                            <span v-if="developer.expYrs >= 5">{{ developer.expYrs }} yrs. </span>

                                                            &nbsp;
                                                            
                                                            <span v-if="developer.expYrs >= 5 && developer.expMos > 0">{{ developer.expMos }} mos. </span>
                                                            
                                                            <!-- 
                                                            <div v-for="(monthYear, index) in Object.keys(developer.expStats).sort().filter(e => e !== 'expYrs' && e !== 'expMos')" :key="index" 
                                                                    style="background:limegreen; 
                                                                           height:30px; 
                                                                           border-right:2px solid white;
                                                                           min-width:70px;
                                                                           text-align:center;"> 
                                                                
                                                                {{ monthYear }}
                                                            
                                                            </div>
                                                            -->                                                            

                                                        </div> 


                                                        <span v-if="developer.expYrs > 0 && developer.expYrs < 5"> &nbsp;  {{ developer.expYrs }} yrs. </span>

                                                        <span v-if="developer.expYrs >= 0 && developer.expYrs < 5 && developer.expMos > 0"> &nbsp; {{ developer.expMos }} mos. </span> 

                                                    </section>

                                                </div>        
                                                
                                                <span style="color:white;">

                                                    <span style="font-size:larger;"> {{ developer.username.toUpperCase() }} </span>
                                                    
                                                    <span style="color:black; font-size:small;"> 
                                                        
                                                        <br/>
                                                        
                                                        📍 near <span style="color:white;">{{ developer.city }}<span style="color:white;">, </span>
                                                        
                                                        {{ developer.state }}</span><span style="color:black;"></span>

                                                    </span>
                                                
                                                </span> 
                                                
                                                <br/>                                             

                                                <div v-if="developer.education !== 'No Degree'" style="font-size:small; line-height:1.4;">

                                                    🎓 <span style="font-weight:bolder;">{{ developer.education }}</span> in <span style="font-weight:bolder;">{{ developer.major }}</span>
                                                    
                                                    <br/>
                                                    
                                                    <span style="padding-left:22px;">from {{ developer.school }} 🏫 </span>

                                                </div>
                                                
                                                <span v-for="(property, dev_index) in Object.keys(developer)" :key="dev_index">

                                                    <span v-if="developer[property] && property !== 'id' 
                                                                                    && property !== 'password' 
                                                                                    && property !== 'username' 
                                                                                    && property !== 'photo'
                                                                                    && property !== 'city'
                                                                                    && property !== 'state'
                                                                                    && property !== 'education'
                                                                                    && property !== 'school'
                                                                                    && property !== 'major'
                                                                                    && property !== 'email'
                                                                                    && property !== 'experienceLevel'
                                                                                    && property !== 'expStats'
                                                                                    && property !== 'expYrs'
                                                                                    && property !== 'expMos'
                                                                                    ">
                                                        
                                                        <!-- {{ property.charAt(0).toUpperCase() + property.slice(1) }}:  -->
                                                        
                                                        <span style="color:black; font-size:small;">
                                                            
                                                            <div v-if="property === 'website'">
                                                                
                                                                🌐 <a :href="developer[property]" class="dev-website" target="_blank">
                                                                
                                                                {{ developer[property] }}
                                                            
                                                                </a>

                                                            </div>    

                                                            <div v-else-if="property === 'workHistory'">
                                                                
                                                                <ul v-if="developer[property].length > 0" style="padding-left:0px; list-style-type:none;">

                                                                    <div style="border-bottom:2px dashed white; color:white;"> {{ property.charAt(0).toUpperCase() + property.slice(1) }} 
                                                                        
                                                                        <span style="color:black;"> ( </span>
                                                                            
                                                                        <span style="color:red; font-size:medium;"> {{ developer.workHistory.length }} </span> 
                                                                        
                                                                        <span style="color:black;"> ) </span>
                                                                        
                                                                        <span style="color:black;"> 
                                                                            
                                                                            <span style="color:white;;"> --> </span> 
                                                                                    
                                                                            <span style="color:blue;">
                                                                            
                                                                                <span v-if="developer.expYrs > 0"> {{ developer.expYrs }} yrs. </span>
                                                                                
                                                                                <span v-if="developer.expMos > 0">{{ developer.expMos }} mos. </span> 
    
                                                                            </span>
    
                                                                        </span>
                                                                    
                                                                    </div> 

                                                                    <li v-for="(devWorkHistory, workHistory_index) in developer[property]" :key="workHistory_index" style="line-height:1.3; margin:6px 0px;">

                                                                        {{ devWorkHistory.employer_name }} 
                                                                        
                                                                        <br/>

                                                                        <span style="font-weight:bolder;"> {{ devWorkHistory.position_name }} </span> 
                                                                        
                                                                        <span style="color:white"> | </span>
                                                                        
                                                                        <span v-if="devWorkHistory.yearDiff > 0">{{ devWorkHistory.yearDiff }} yrs. </span>{{ devWorkHistory.monthDiff }} mos. 
                                                                        
                                                                        <span style="color:white"> | </span> 

                                                                        {{ devWorkHistory.startMonth.substring(0,3) }}'{{ devWorkHistory.startYear.toString().substring(2) }} 
                                                                        
                                                                        <span style="color:white;">--></span> 
                                                                        
                                                                        {{ devWorkHistory.endMonth.substring(0,3) }}'{{ devWorkHistory.endYear.toString().substring(2) }}

                                                                    </li>

                                                                </ul>

                                                            </div>

                                                            <div v-else-if="property === 'projectHistory'">

                                                                <ul v-if="developer[property].length > 0" style="padding-left:0px; list-style-type:none;">
                                                                    
                                                                    <div style="border-bottom:2px dashed white; color:white;"> {{ property.charAt(0).toUpperCase() + property.slice(1) }} 
                                                                        
                                                                        <span style="color:black;"> ( </span>
                                                                        
                                                                        <span style="color:white;"> {{ developer.projectHistory.length }} </span> 

                                                                        <span style="color:black;"> ) </span>

                                                                    </div> 

                                                                    <li v-for="(devProjectHistory, projectHistory_index) in developer[property]" :key="projectHistory_index" style="line-height:1.3; margin:6px 0px;">

                                                                        <span style="font-weight:bolder;">{{ devProjectHistory.project_name }}</span> 

                                                                        <br/>

                                                                        <span v-if="devProjectHistory.project_website">

                                                                            <a :href="devProjectHistory.project_website" class="dev-website" target="_blank">
                                                                            
                                                                                {{ devProjectHistory.project_website }}
                                                                        
                                                                            </a> 
                                                                        
                                                                            <span style="color:white"> | </span> 

                                                                        </span>

                                                                        {{ devProjectHistory.startMonth.substring(0,3) }}'{{ devProjectHistory.startYear }} 

                                                                        <span style="color:white;">--></span> 
                                                                        
                                                                        {{ devProjectHistory.endMonth.substring(0,3) }}'{{ devProjectHistory.endYear }}

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
        
        // console.log(this.screens.developers.top100); // debug

        this.setExperienceBars();        
        
        this.dates.years = this.GetYearsRange();
        
        this.screens.developers.loadingGif = false;     
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

            // commented out because of zoom-in bug on mobile browser iPhone XR
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

            if (screen_name === 'developers' && this.screens['developers'].display === true)
            {
                this.setExperienceBars();
            }
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
            console.log(this.screens); // debug
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

        /**
         * 
         */
        setExperienceBars()
        {
            this.$nextTick(() => 
            {
                this.screens.developers.top100.forEach((e /*, i*/) => 
                {
                    let decimal = parseInt(e.expMos) / 12; 

                    let fullNum = parseInt(e.expYrs) + decimal;

                    let finalNum = Math.floor((fullNum / 10) * 100);

                    let domElement = document.getElementById(`dev-exp-${e.id}`)

                    domElement.style.width = `${finalNum}%`;
                }); 
            })
        },

    }, 
}
</script>

<style scoped>

#dev-nation-ui 
{
    background-image:url('https://media1.giphy.com/media/4N1FZFE5AGO3qrUGkw/giphy.gif');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;

    /* background: dodgerblue; */
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.ui-segment
{
    color: white;
    padding: 5px;
}

#navbar 
{
    background: dodgerblue;
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
    font-size: smaller;
}

    .dev-website:hover
    {
        color: purple;
    }

.developer-card
{    
    background: dodgerblue;
    border: 1px solid white;
    border-radius: 8px;
    margin: 8px; 
    max-width: 400px; 
    transition: all 0.09s ease; 
}

    .developer-card:hover
    {    
        background: peru;
        border-color: black;
        box-shadow: black 0px 3px 6px;    
    }

h1 
{
    color:black; 
    margin: 0px;
    text-align:center;
    text-decoration:underline; 
}

.loading-gif
{
    width: 25px;
}

.city-name 
{
    border-bottom: 3px dashed red;
    color: red; 
    text-align: center;
}

.experience-bar
{    
    border: 1px solid black;
}

    .experience-bar:hover
    {
        box-shadow: black 0px 2px 4px;
    }

@media(max-width:600px)
{
    #dev-nation-ui
    {        
        font-size: small;
    }

    .developer-card 
    {        
        max-height: 415px; 
        overflow-y: auto;
    }
}

</style>