<template>
    <header>
        <div style="line-height:1.75; padding:10px;">
            <router-link to="/">Index</router-link><br/>
            <router-link to="/login">Login</router-link><br/>
            <router-link to="/signup">Signup</router-link><br/>
        </div>
    </header>
</template>

<script>
export default {
    name: 'NavigationBar',
}
</script>

<style scoped>
    a {
        color:#635bff;
    }
</style>
