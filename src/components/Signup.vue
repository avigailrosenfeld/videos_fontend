<template>
    <div class="vue-tempalte">
        <form @submit="createUser" method="post"> 
            <h3>Sign Up</h3>

            <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            placeholder="Enter your name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
          :state="emailState"
        >
          <b-form-input
            id="email-input"
            v-model="email"
            placeholder="Enter your email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
          :state="passwordState"
        >
          <b-form-input
            id="password-input"
            v-model="password"
            placeholder="Enter your password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
         <input type="submit" class="btn btn-dark btn-lg btn-block" value="Sign Up">
          
            
        </form>
        <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
    </div>
</template>

<script>
export default {
  
  data() {
    return {
      name:'',
      nameState: null,
      email:'',
      emailState: null,
      password:'',
      passwordState: null,
     };
  },
  methods: {
    createUser: function(e){   
      e.preventDefault();

      this.errors = [];

      // Exit when the form isn't valid
      if (this.name === '' || this.email === '' || this.password === '') {
        this.errors.push('Product name is required.');
      }
  
      let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: true
        }

        this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      
    }
  }
};
</script>