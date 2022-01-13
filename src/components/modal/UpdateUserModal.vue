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
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
</template>

<script>
export default {
  name: "update-user-modal",
  data() {
    return {
      name:'',
      nameState: null,
      email:'',
      emailState: null,
     };
  },
  methods: {
    resetUpdateModal() {
        this.name = ''
        this.nameState = null
        this.email = ''
        this.emailState = null
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        this.emailState = valid
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
      this.$emit('initiateUpdate', this.name, this.email)
    }
  }
};
</script>