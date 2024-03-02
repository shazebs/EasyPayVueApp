<template>
  <div>
    <!-- Navigation -->
    <NavigationBar v-show="true"></NavigationBar>

    <!-- Button clicks -->
    <!-- <button @click="consoleLog()">'consoleLog()'</button><br/>
    <button @click="getRandomUser()">'getRandomUser()'</button> -->

    <!-- Router View -->
    <router-view></router-view>    

    <!-- <GCU></GCU> -->

  </div>  
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
//import GCU from './components/GCU.vue';

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
    //GCU,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
#app {
  font-family: "Raleway", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: normal;
}

a {
    color:#635bff;
    font-size:125%;
    text-decoration:none;
    transition: all 0.2s ease;
}
a:hover {
  color:dodgerblue;
  text-decoration:underline;
  transition: all 0.2s ease;
}
</style>