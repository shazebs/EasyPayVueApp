<template>
    <div>
        <h1 align="center">Welcome to Social Awards by @shazebs</h1>

        <div class="error-message" v-if="errors.disconnect" :class="{'slide-in': errors.disconnect}">
            <span></span>You are disconnected!<br/>Try refreshing the page.<span @click="closeError('disconnect')">&times;</span>
        </div>

        <button @click="sendMessage">Send Message</button>
    </div>
</template>

<script>
export default {
    name: 'SocialAwards',
    data() {
        return {
            connection: null,
            errors: {
                disconnect: false
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

            if (this.connection.readyState === WebSocket.OPEN) 
            {
                this.connection.send(data_string);
            } 
            else {
                this.errors.disconnect = true;
            }   
        },
        closeError(errorKey) {
            this.errors[errorKey] = false;
        },
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
            alert(data.message);
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
            font-size:larger;
            margin-right:5px; 
        }
            .error-message span:hover {
                color:white; 
                cursor:pointer;
            }
</style>