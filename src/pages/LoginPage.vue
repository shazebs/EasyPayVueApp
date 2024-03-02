<template>
    <div align="left">
        <h1>Login</h1>

        <input type="text" name="username" placeholder="Username"/>
        <br/>
        <input type="password" name="password" placeholder="Password"/>
        <br/>
        <button>Login</button>

        <h3 v-if="$route.params.username">{{ $route.params.username }}</h3>
        <h3 v-else>Username DNE</h3>
        <h4 v-if="$route.params.id">{{ $route.params.id }}</h4>
        <h4 v-else>Id DNE</h4>

    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            title: 'Hello?'
        }
    },

};
</script>

<style scoped>
</style>