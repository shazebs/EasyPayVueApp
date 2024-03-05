<template>
  <div>

    <NavigationBar />

    <router-view />

  </div>  
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import { mapState } from 'vuex'; 

export default {
  name: 'App',
  data() {
    return {
      currentUser: null
    }
  },
  components: {
    NavigationBar,
  },
  created() {
    var token = localStorage.getItem('token');
    this.currentUser = JSON.parse(token); 
    this.$store.dispatch('user', this.currentUser);
  },
  computed: {
    ...mapState(['user'])
  }
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