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
            <div v-on:click="logout" v-if="isLoggedIn" class="nav-link pr-3" v-bind:style="{cursor: pointer}">Logout</div>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
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

</style>
