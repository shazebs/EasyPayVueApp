<template>
  <div>
    <NavigationBar />
    <router-view />
  </div>  
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    // add methods here
  },
  components: {
    NavigationBar,
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