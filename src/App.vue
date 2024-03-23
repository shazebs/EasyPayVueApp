<template>
  <div>
    <NavigationBar />
    <SpinLoader v-if="false" />
    <router-view />
  </div>  
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import SpinLoader from './components/SpinLoader.vue';
import { mapState } from 'vuex'; 

export default {
  name: 'App',
  components: {
    NavigationBar,
    SpinLoader
  },  
  computed: {
    ...mapState(['user'])
  },
  created() {
    var token = localStorage.getItem('token');
    if (token) this.$store.dispatch('user', JSON.parse(token));
  },
}
</script>

<style>
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