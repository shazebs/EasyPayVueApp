<template>
  <div>
    <NavigationBar />

    <router-view />

  </div>  
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {};
  },
  async created() {
    try {
      const response = await axios.post('login', {
        username: 'easypay_admin',
        password: 'password1234'
      });

      this.$store.dispatch('user', response.data.user); 
    }    
    catch (error)
    {
      this.$store.dispatch('user', error.response.data.user);
    }
  },
  methods: {
    
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