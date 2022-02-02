<template>
  <b-modal 
      id="create-video-modal"
      title="Create Video"
      ref="modal"
      @show="resetCreateModal"
      @hidden="resetCreateModal"
      @ok="initiateCreate"
      >
      <form ref="form" @submit.stop.prevent="initiateCreate">
        <b-form-group
          label="FileName"
          label-for="filename-input"
          invalid-feedback="FileName is required"
          :state="filenameState"
        >
          <b-form-input
            id="filename-input"
            v-model="filename"
            placeholder="Enter your name"
            :state="filenameState"
            required
          ></b-form-input>  
        </b-form-group>
      </form>
    </b-modal>
</template>

<script>
export default {
  name: "create-video-modal",
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
    resetCreateModal() {
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
    initiateCreate(bvModalEvt){
        //Prevent modal from closing
        bvModalEvt.preventDefault()
        
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {
          this.$bvModal.hide('create-video-modal')
        })
      this.$emit('initiateCreate', this.filenameState, this.lengthState, this.widthState, this.heightState, this.sizeState)
    }
  }
};
</script>