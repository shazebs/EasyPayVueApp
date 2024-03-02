<template>
    <header>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link> 
        <router-link to="/signup">Signup</router-link>
    </header>
</template>

<script>
export default {
    name: 'NavigationBar',
}
</script>

<style scoped>
    header {
        border-bottom:2px dashed black;
        border-top:2px dashed black;
        display:flex;
        justify-content: space-evenly;   
        margin:auto;
        padding:8px 0px;    
    }    
</style>
