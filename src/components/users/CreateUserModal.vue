<template>
  <b-modal 
      id="create-user-modal"
      title="Create User"
      ref="modal"
      @show="resetCreateModal"
      @hidden="resetCreateModal"
      @ok="initiateCreate"
      >
      <form ref="form" @submit.stop.prevent="initiateCreate">
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
      </form>
    </b-modal>
</template>

<script>
export default {
  name: "create-user-modal",
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
    resetCreateModal() {
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
    initiateCreate(bvModalEvt){
        //Prevent modal from closing
        bvModalEvt.preventDefault()
        
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {
          this.$bvModal.hide('create-user-modal')
        })
      this.$emit('initiateCreate', this.name, this.email, this.password)
    }
  }
};
</script>