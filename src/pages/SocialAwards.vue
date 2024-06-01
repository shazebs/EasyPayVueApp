<template>
    <div style="text-align:center; ">
        <h1 class="social-awards-title"><span class="welcome-title">Welcome to the <span style="color:dodgerblue;">Social Awards</span>!!!</span><br/><span class="created-by-title">Created by @<a href="https://instagram.com/shazebs" style="color:dodgerblue; text-decoration:underline;" target="_blank">shazebs</a></span></h1>

        <!-- Disconnection error message -->
        <div class="error-message" v-if="errors.disconnect" :class="{'slide-in': errors.disconnect}">
            <span></span>
            You are disconnected!<br/>
            Try refreshing the page.
            <span @click="closeError('disconnect')">&times;</span>
        </div>

        <p>Choose your login:</p>
        <button @click="openLoginModal('Host')" class="host-login-button">Host</button>
        <button @click="openLoginModal('Voter')" class="voter-login-button">Attendee</button>

        <br/>
        <!--<button @click="sendMessage">Send Message</button>-->
    </div>

    <!-- Login modal -->
    <div v-if="loginModal.toggle == true" class="login-modal">
        <div class="login-modal-content">
            <section style="display:flex; justify-content: space-evenly; align-items: center; font-size:22px;">
                <section style="font-size:20px; text-align:center; width:100%; align-items: center; ">
                    <span v-if="loginModal.user === 'Host'" style="color:dodgerblue; font-weight:bolder;">{{ loginModal.user }} Login</span>
                    <span v-if="loginModal.user === 'Voter'" style="color:limegreen; font-weight:bolder;">{{ loginModal.user }} Login</span>
                </section>
                <section style="color:red;"><span @click="closeLoginModal()" class="modal-close-button">&times;</span></section>                
            </section>            
            <hr/>
            
            <section style="text-align:center; font-size:20px; ">
                <label style="display: inline-block; min-width:55px;">User:</label><input style="font-size:18px; text-align: center;"/>
                <br/>
                <label style="display: inline-block; min-width:55px;">PIN:</label><input style="font-size:18px; text-align: center;"/>
                <br/>
                <button class="submit-login-button" @click="submitLogin()">Access</button>
            </section>
        </div>
    </div>

    <section style="text-align:center; margin:2%;">
        <button @click="announceWinner()" style="border:1px solid black; font-size:15px; padding:8px; background:red; color:white; border-radius:8px;">Announce Winner!</button><br/><br/>
        <img v-if="showWinner" src="https://easypaytestblobstorage.blob.core.windows.net/photos/8a03f7ef-db6b-4db6-ae7d-460a870ec88d.jpg" style="width:350px;" class="animate"/>
    </section>

    <audio ref="audioFanfare" src="/assets/fanfare.wav"></audio>    

</template>

<script>
export default {
    name: 'SocialAwards',
    data() {
        return {
            connection: null,
            errors: {
                disconnect: false
            },
            loginModal: {
                toggle: false,
                user: null
            },
            isPlaying: false,
            showWinner: false
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
        submitLogin() {
            alert('Sorry! This button doesn\'t work right now.');
        },
        toggleFanfare() {
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
        announceWinner() {
            const data = {
                message: 'announce-winner'
            };
            const data_string = JSON.stringify(data);

            if (this.connection.readyState === WebSocket.OPEN) {
                this.connection.send(data_string);
            } else {
                this.errors.disconnect = true;
            }   
        }
    },
    created() {
        console.log("Starting Connection to WebSocket Server");
        //this.connection = new WebSocket('wss://localhost:7088/ws');
        this.connection = new WebSocket('wss://easypayapitest.azurewebsites.net/ws');

        this.connection.onopen = (event) => {
            console.log(event);
            console.log("Successfully connected to WebSocket.");
        }

        this.connection.onmessage = (event) => {
            console.log(event);
            const data = JSON.parse(event.data);
            //alert(data.message);
            if (data.message === 'announce-winner') {
                this.toggleFanfare();
                this.showWinner = true;
            }
            console.log(data);
        }

        this.connection.onclose = (event) => {
            console.log(event);
        }

        this.connection.onerror = (error) => {
            console.log('[websocket error]', error);
            this.errors.disconnect = true;
        }
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
        margin: 25% auto;
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

    .animate {
        animation-name: slideInRight; 
        animation-duration: 8s; 
        animation-timing-function: ease; 
    }
    @keyframes slideInRight {
        0% {
            transform: translateX(100%);
            opacity: 0;
            border-radius:1000px;
        }
        100% {
            transform: translateX(0);
            opacity: 1;  
        }
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