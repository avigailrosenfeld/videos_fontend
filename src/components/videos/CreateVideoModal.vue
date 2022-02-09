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
          placeholder="Enter your file name"
          :state="filenameState"
          required
        ></b-form-input>
        </b-form-group>
        <b-form-group
          label="VideoFile"
          label-for="video-file-input"
          invalid-feedback="Video File is required"
          :state="videoFileState"
        >
          <b-form-file
            id="video-file-input"
            v-model="videofile"
            accept=".mp4"
            placeholder="Choose a file or drop it here..."
            :state="videoFileState"
            required
          ></b-form-file>
        </b-form-group>
      </form>
    </b-modal>
</template>

<script>
export default {
  name: "create-video-modal",
  data() {
    return {
      filename:'123',
      filenameState: null,
      videofile:'123',
      videoFileState: null,
      length:'123',
      lengthState: null,
      width:'123',
      widthState: null,
      height:'123',
      heightState: null,
      size:'123',
      sizeState: null,
     };
  },
  methods: {
    resetCreateModal() {
        this.filename = ''
        this.filenameState = null
        this.videofile = ''
        this.videoFileState = null
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
        this.videoFileState = valid
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
      this.$emit('initiateCreate', this.filename, this.videofile, this.length, this.width, this.height, this.size)
    }
  }
};
</script>