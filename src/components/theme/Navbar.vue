<template>
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
            <a v-on:click="logout" v-if="isLoggedIn" class="nav-link pr-3">Logout</a>
          </li>
        </ul>
      </div>
      <div>  
        <nav >
          <router-link class="navbar-brand" to="/videos_list">Video directory</router-link>
          <router-link class="navbar-brand" to="/create_video">Create Video</router-link>
          <router-link class="navbar-brand" to="/about_page">About</router-link>
        </nav>
        </div>
    </nav>
</template>

<script>
export default {
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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");

nav {
  display: flex;
  background-color: white;
  font-family: Open Sans;
}

nav a {
  flex: 1;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: black;
  transition: all 0.2s;
}

nav a:hover {
  background: #2196f3;
  color: white;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 80px);
}

h1,
h2 {
  margin: 0;
}

h1 {
  font-size: 3em;
}
</style>