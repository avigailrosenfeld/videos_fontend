<template>
  <div class="vue-tempalte">
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
        <Navbar />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/theme/Navbar.vue";
import Footer from "./components/theme/Footer.vue";
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
