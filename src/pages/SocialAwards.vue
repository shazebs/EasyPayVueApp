<template>
    <div style="text-align:center; ">
        <!-- Social awards title -->
        <h1 class="social-awards-title"><span class="welcome-title">Welcome to the <span style="color:dodgerblue;">Social Awards</span>!!!</span><br/><span class="created-by-title">Created by @<a href="https://instagram.com/shazebs" style="color:dodgerblue; text-decoration:underline;" target="_blank">shazebs</a></span></h1>

        <!-- User login status -->
        <h3 v-if="loginModal.loginData.status == 'Host'">Host <span style="color:limegreen;">{{ loginModal.loginData.username }}</span> is logged in!</h3>
        <h3 v-if="loginModal.loginData.status == 'Voter'">Voter <span style="color:red;">{{ loginModal.loginData.username }}</span> is logged in!</h3>

        <!-- Disconnection error message -->
        <div class="error-message" v-if="errors.disconnect" :class="{'slide-in': errors.disconnect}">
            <span></span>
            You are disconnected!<br/>
            Try refreshing the page.
            <span @click="closeError('disconnect')">&times;</span>
        </div>

        <!-- User login buttons -->    
        <div v-if="loginModal.loginData.status == null">
            <p>Choose your login:</p>
            <button @click="openLoginModal('Host')" class="host-login-button">Host</button>
            <button @click="openLoginModal('Voter')" class="voter-login-button">Attendee</button>
            <br/>
        </div>
    </div>

    <!-- Login modal -->
    <div v-if="loginModal.toggle == true" class="login-modal">
        <div class="login-modal-content">
            <!-- header -->
            <section style="display:flex; justify-content: space-evenly; align-items: center; font-size:22px;">
                <!-- Login modal title -->
                <section style="font-size:20px; text-align:center; width:100%; align-items: center; ">                 
                    <span v-if="loginModal.user === 'Host'" style="color:dodgerblue; font-weight:bolder;">{{ loginModal.user }} Login</span>
                    <span v-if="loginModal.user === 'Voter'" style="color:limegreen; font-weight:bolder;">{{ loginModal.user }} Login</span>
                </section>
                <!-- Login modal Close button -->
                <section style="color:red;"><span @click="closeLoginModal()" class="modal-close-button">&times;</span></section>                
            </section>            
            <hr/>   
            <!-- User login input form -->         
            <section style="text-align:center; font-size:20px; ">
                <form @submit.prevent="submitLogin()">
                    <label style="display: inline-block; min-width:55px;">User:</label><input required v-model="loginModal.loginData.username" style="font-size:18px; text-align:center;"/>
                    <br/>
                    <label style="display: inline-block; min-width:55px;">PIN:</label><input required  v-model="loginModal.loginData.pin" style="font-size:18px; text-align:center;"/>
                    <br/>
                    <button class="submit-login-button" type="submit">Access</button>
                </form>                
            </section>
        </div>
    </div>         
    
    <!-- Live chat container -->
    <div v-if="loginModal.loginData.status != null">
        <!-- Live chats -->
        <div id="live-chat" ref="liveChatContainer" @scroll="handleChatScroll()">
            <transition-group name="chat" tag="section">
                <section v-for="(chat, index) in liveChat.chats" :key="index">
                    <span class="animate-chat"><label style="font-weight:bolder;" :class="chat.gender === 'M' ? 'male' : 'female'">{{ chat.user }}:</label> {{ chat.message }}</span>
                </section>
            </transition-group>
        </div>
        <!-- New chat input -->
        <form @submit.prevent="sendNewChat()">
            <div style="display:flex; align-items: center; margin-top:6px; ">
                <input class="chat-input" required v-model="liveChat.newChat" placeholder="Send a Chat!"/>
                <button class="send-chat-button" type="submit">Send</button>
            </div> 
        </form>     
    </div>    

    <!-- NOT IMPORTANT -->
    <!-- Fanfare audio -->
    <audio ref="audioFanfare" src="/assets/fanfare.wav"></audio> 
    <!--
    <section style="text-align:center; margin:1%;">
        <button @click="toggleFanfare()" style="border:1px solid black; font-size:15px; padding:8px; background:red; color:white; border-radius:8px;">Announce Winner!</button><br/>
        <img v-if="showWinner" src="https://easypaytestblobstorage.blob.core.windows.net/photos/8a03f7ef-db6b-4db6-ae7d-460a870ec88d.jpg" style="width:300px; border-radius:8px;" class="animate"/>
    </section>
    <button @click="deleteChatExample()">Delete first chat test button</button>
    <button @click="getVoterData()">Get Voter Data</button>
    -->
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'SocialAwards',
    computed: {
        ...mapState(['showNav'])
    },
    data() {
        return {
            connection: null,
            errors: {
                disconnect: false
            },
            loginModal: {
                toggle: false,
                user: null,
                loginData: {
                    username: '',
                    pin: '',
                    status: null,
                    id: null,
                    gender: null
                }
            },
            isPlaying: false,
            showWinner: false,
            liveChat: {
                chats: [],
                newChat: '',
                autoScroll: true,
            }
        }
    },
    methods: {
        async sendMessage() {
            const data = {
                message: 'Hello World!',
                client_id: 999
            };
            const data_string = JSON.stringify(data);
            if (this.connection.readyState === WebSocket.OPEN) {
                this.connection.send(data_string);
            } else {
                this.errors.disconnect = true;
            }   
        },
        closeError(errorKey) {
            this.errors[errorKey] = false;
        },
        openLoginModal(user) {
            this.loginModal.user = user;
            this.loginModal.toggle = true;
        },
        closeLoginModal() {
            this.loginModal.toggle = false;
        },
        async submitLogin() {
            this.loginModal.toggle = false;
            const data = {
                user_name: this.loginModal.loginData.username,
                user_key: this.loginModal.loginData.pin,
                user_type: this.loginModal.user
            };
            try {
                const loginResponse = await axios.post('login-user', data);
                if (loginResponse.data.user_id === -1) {
                    alert('Invalid Login! Try again.'); 
                } 
                else {
                    this.loginModal.loginData.username = loginResponse.data.user_name;
                    this.loginModal.loginData.status = loginResponse.data.user_type;
                    this.loginModal.loginData.id = loginResponse.data.user_id;
                    this.liveChat.newChat = 'Joined the chat!';
                    this.sendNewChat();
                    console.log('loginResponse', loginResponse.data);

                    this.getChatHistory();
                }                
            }
            catch (error) {
                alert(`[ERROR]: ${error.data.message}`);
            }
        },
        async getChatHistory() {
            try {
                const response = await axios.get('live-chats');
                console.log('chat history', response.data);
                this.liveChat.chats = response.data.chats;
            }
            catch (error) {
                alert(`[error] ${error.response.data.message}`);
                //alert(error.data.message);
            }
        },
        async toggleFanfare() {
            await this.announceWinner();
            const audioFanfare = this.$refs.audioFanfare;
            if (audioFanfare) {
                if (this.isPlaying) {
                    audioFanfare.pause();
                } else {
                    audioFanfare.play();
                }
                this.isPlaying = !this.isPlaying;
            }
        },
        async announceWinner() {
            const data = {
                message: 'announce-winner'
            };
            const data_string = JSON.stringify(data);
            if (this.connection.readyState === WebSocket.OPEN) {
                this.connection.send(data_string);
            } else {
                this.errors.disconnect = true;
            }   
        },
        sendNewChat() {
            const data = {
                action: 'new-chat',
                user: this.loginModal.loginData.username,
                message: this.liveChat.newChat,
                user_id: this.loginModal.loginData.id
            };
            const data_string = JSON.stringify(data);
            this.connection.send(data_string);
            this.liveChat.newChat = '';
            this.liveChat.autoScroll = true;
        },
        deleteChatExample() {
            this.liveChat.chats.splice(0,1);
        },
        scrollToBottom() {
            const chatContainer = this.$refs.liveChatContainer;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        handleChatScroll() {
            const chatContainer = this.$refs.liveChatContainer;
            const threshold = 10;
            const position = chatContainer.scrollTop + chatContainer.clientHeight;
            const height = chatContainer.scrollHeight;
            if (position >= height - threshold) {
                this.liveChat.autoScroll = true;
            } 
            else {
                this.liveChat.autoScroll = false;
            }
        },
        getVoterData() {
            const data = {
                action: 'get-voters'
            };
            this.connection.send(JSON.stringify(data));
        }
    },
    created() {
        // Turn off navigation bar.
        if (this.$route.path === '/awards')
            this.$store.dispatch('showNav', false);

        console.log("[1] Starting Connection to Social Awards WebSocket Server...");
        //this.connection = new WebSocket('wss://localhost:7088/ws');
        this.connection = new WebSocket('wss://easypayapitest.azurewebsites.net/ws');

        this.connection.onopen = (/*event*/) => {
            //console.log(event);
            console.log("[2] ...Successfully connected to Social Awards WebSocket.");
        }

        this.connection.onmessage = (event) => {
            //console.log(event);
            const data = JSON.parse(event.data);
            //console.log('onmessage data', data);
            if (data.message === 'announce-winner') {
                this.showWinner = true;
            }
            else if (data.action === 'new-chat') {
                const newChatData = {
                    user: data.user,
                    message: data.message,
                    gender: data.gender
                };
                this.liveChat.chats.push(newChatData);
                this.$nextTick(() => {
                    if (this.liveChat.autoScroll) {
                        this.scrollToBottom();
                    }
                });
            }
            else if (data.includes('get-voters')) {
                const parsedData = JSON.parse(data);
                console.log('voter data', parsedData);
            }
        }
        this.connection.onclose = (event) => {
            console.log(event);
        }
        this.connection.onerror = (error) => {
            console.log('[websocket error]', error);
            this.errors.disconnect = true;
        }
    },
    updated() {
        this.$nextTick(() => {
            //this.scrollToBottom();
        });
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
        margin: 10px auto; 
        min-width: 300px; 
        padding: 3px; 
        width: 50%;
    }
        .error-message span {
            font-size: larger;
            margin-right: 5px; 
        }
            .error-message span:hover {
                color: white; 
                cursor: pointer;
            }

    button:hover {
        cursor:pointer;
    }

    .host-login-button {
        background-color:dodgerblue;
        border-radius:5px; 
        color: black;
        font-size: 15px;
        font-weight: bold;
        margin-right: 2.5px;
        padding: 5px;
    }

    .voter-login-button {
        background-color: limegreen;
        border-radius:5px; 
        color: black;
        font-size: 15px;
        font-weight: bold;
        margin-left: 2.5px;
        padding: 5px;
    }

    .login-modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    .login-modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px 20px;
        border: 1px solid #888;
        width: 80%;
    }

    .submit-login-button {
        font-weight:bold;
        margin-top:15px;
        border-radius: 5px;
        border: 2px solid black;
        font-size:16px;
        padding:5px;
        background:lightgray;
    }

    .created-by-title {
            font-size:26px;
        }

    .modal-close-button {
        font-size:30px;
    }
        .modal-close-button:hover {
            cursor:pointer;
        }

    #live-chat {
        border: 2px solid black;
        border-radius: 5px; 
        display: flex;
        flex-direction: column;
        height: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
    }
        #live-chat section {
            padding:4px;
        }

    .chat-input {
        border: 1px solid black;
        border-radius: 5px; 
        font-size: 16px;
        padding: 2px 4px;
        width: 100%;
    }
    .send-chat-button {
        background: limegreen;
        border-radius:5px; 
        font-weight: bold;
        padding: 3px 6px;
    }

    .male {
        color:dodgerblue;
    }
    .female {
        color:hotpink;
    }

    .animate {
        animation-name: slideInRight; 
        animation-duration: 8s; 
        animation-timing-function: ease; 
    }
    @keyframes slideInRight {
        0% {
            border-radius:1000px;
            width: 0px;
            opacity: 0;
        }
        80% {
            opacity: 0.2;
        }
        100% {
            border-radius:8px;
            width: 300px;
            opacity: 1;
        }
        /*0% {
            transform: translateX(100%);
            opacity: 0;
            border-radius:1000px;
        }
        100% {
            transform: translateX(0);
            opacity: 1;  
        }*/
    }
    
    .chat-enter-active, .chat-leave-active {
        transition: all 0.5s ease;
    }
    .chat-enter-from, .chat-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    @media(max-width:600px) {
        .welcome-title {
            font-size:22px;
        }
        .created-by-title {
            font-size:18px;
        }
    }

</style>