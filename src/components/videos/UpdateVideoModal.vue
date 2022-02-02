<template>
  <b-modal 
      id="update-video-modal"
      title="Update Video"
      ref="modal"
      @show="resetUpdateModal"
      @hidden="resetUpdateModal"
      @ok="initiateUpdate"
      >
      <form ref="form" @submit.stop.prevent="initiateUpdate">
        <b-form-group
          label="FileName"
          label-for="filename-input"
          invalid-feedback="Name is required"
          :state="filenameState">
          <b-form-input
            id="filename-input"
            v-model="filename"
            :state="filenameState"
            placeholder="Enter your name"
            required
          ></b-form-input>    
        </b-form-group>
      </form>
    </b-modal>
</template>

<script>
export default {
  name: "update-video-modal",
  data() {
    return {
      filename:'',
      filenameState: null,
      length:'',
      lengthState: null,
      width:'',
      widthState: null,
      height:'',
      heightState: null,
      size:'',
      sizeState: null,
     };
  },
  methods: {
    resetUpdateModal() {
        this.filename = ''
        this.filenameState = null
        this.length = ''
        this.lengthState = null
        this.width = ''
        this.widthState = null
        this.height = ''
        this.heightState =  null
        this.size = ''
        this.sizeState = null
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.filenameState = valid
        this.lengthState = valid
        this.widthState = valid
        this.heightState =  valid
        this.sizeState = valid
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
          this.$bvModal.hide('update-video-modal')
        })
      this.$emit('initiateUpdate', this.filenameState, this.lengthState, this.widthState, this.heightState, this.sizeState)
    }
  }
};
</script>