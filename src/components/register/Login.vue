<template>
    <div class="vue-tempalte">
        <form @submit="login" method="post">
            <h3>Sign In</h3>

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
             <input type="submit" class="btn btn-dark btn-lg btn-block" value="Sign In">

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot_password">Forgot password ?</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
             return {
                email:'',
                emailState: null,
                password:'',
                passwordState: null,
                };
        },
        methods: {
            login: function(e){   
                e.preventDefault();

                this.errors = [];

                // Exit when the form isn't valid
                if (this.email === '' || this.password === '') {
                    this.errors.push('Product name is required.');
                }
                let email = this.email;
                let password = this.password;
                this.$store.dispatch('login', { email, password })
                    .then(() => this.$router.push('users/'))
                    .catch(err => console.log(err))
            }
        }
        
    }
</script>