<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/signup">Sign up</router-link>        
          </li>
          <li class="nav-item">
            <div v-on:click="logout" v-if="isLoggedIn" class="nav-link pr-3">Logout</div>
          </li>
        </ul>
      </div>
      <div> <Navbar /></div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "app",
   components: {
    Navbar,
    Footer,
  },
  computed: {
      isLoggedIn: function() { return this.$store.getters.isLoggedIn }
    },
  methods: {
    logout: function() {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
  }
};
</script>

<style>
@import url(bootstrap.min.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
