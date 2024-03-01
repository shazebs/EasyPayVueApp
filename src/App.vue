<template>
  <div>
    <!-- Navigation -->
    <NavigationBar></NavigationBar>

    <!-- Button clicks -->
    <!-- <button @click="consoleLog()">'consoleLog()'</button><br/>
    <button @click="getRandomUser()">'getRandomUser()'</button> -->

    <!-- Router View -->
    <router-view></router-view>    

    <GCU></GCU>

  </div>  
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import GCU from './components/GCU.vue';

export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
    consoleLog() 
    {
      console.log('Hello User, \'consoleLog()\' function works!');
    },
    async getRandomUser() 
    {
      const res = await fetch('https://randomuser.me/api');
      const { results } = await res.json();
      console.log(results); 
    }
  },
  components: {
    NavigationBar,
    GCU,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>