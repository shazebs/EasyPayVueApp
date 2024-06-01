<template>
    <div>
        <h1 align="center">Welcome to Social Awards by @shazebs</h1>
        <button @click="sendMessage">Send Message</button>
    </div>
</template>

<script>
export default {
    name: 'SocialAwards',
    data() {
        return {
            connection: null
        }
    },
    methods: {
        sendMessage() {
            const data = {
                message: 'Hello World!',
                client_id: 999
            };
            const data_string = JSON.stringify(data);
            this.connection.send(data_string);
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
            alert(data.message);
            console.log(data);
        }

        this.connection.onclose = (event) => {
            console.log(event);
        }

        this.connection.onerror = (error) => {
            console.log(error);
        }
    }
}
</script>

<style scoped>

</style>