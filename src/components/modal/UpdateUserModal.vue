<template>
  <b-modal 
      id="update-user-modal"
      title="Update User"
      ref="modal"
      @show="resetUpdateModal"
      @hidden="resetUpdateModal"
      @ok="initiateUpdate"
      >
      <form ref="form" @submit.stop.prevent="initiateUpdate">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            placeholder="Enter your name"
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
      </form>
    </b-modal>
</template>

<script>
export default {
  name: "update-user-modal",
  props: ['user'],
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
    resetUpdateModal() {
        this.name = ''
        this.nameState = null
        this.email = ''
        this.emailState = null
        this.password = ''
        this.passwordState = null
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        this.emailState = valid
        this.passwordState = valid
        return valid
    },
    initiateUpdate(bvModalEvt){
        //Prevent modal from closing
        bvModalEvt.preventDefault()
        
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {
          this.$bvModal.hide('update-user-modal')
        })
      this.$emit('initiateUpdate', this.name, this.email, this.password)
    }
  }
};
</script>