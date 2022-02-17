<template>
  <b-modal 
      id="create-video-modal"
      title="Create Video"
      ref="modal"
      @show="resetCreateModal"
      @hidden="resetCreateModal"
      @ok="initiateCreate"
      >
      <form ref="form" @submit.stop.prevent="initiateCreate" enctype="multipart/form-data">
      <b-form-row> 
        <b-col>
          <b-form-group
            label="File Name:"
            label-for="filename-input"
            invalid-feedback="FileName is required"
            :state="filenameState"
          ></b-form-group>
        </b-col>
        <b-col>
          <b-form-input      
            id="filename-input"
            v-model="filename"
            placeholder="Enter your file name"
            :state="filenameState"
            required
          ></b-form-input>
        </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group
              label="Private:"
              label-for="private-checkbox"
              invalid-feedback="Private is required"
              :state="privateState"
            ></b-form-group>
          </b-col>
          <b-col>
            <b-form-checkbox
              id="private-checkbox"
              v-model="privatevideo"
              :state="privateState"
            ></b-form-checkbox>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group
              label="Allow anonymous embed:"
              label-for="anonymousembed-checkbox"
              invalid-feedback="Anonymous embed is required"
              :state="anonymousembedState"
            ></b-form-group>
          </b-col>
          <b-col>
            <b-form-checkbox
              id="anonymousembed-checkbox"
              v-model="anonymousembed"
              :state="anonymousembedState"
            ></b-form-checkbox>
          </b-col>
        </b-form-row>
        
        <b-form-row>
          <b-col>
            <b-form-group
              label="Tags:"
              label-for="tags-select"
              invalid-feedback="Tags is required"
              :state="tagsState"
            ></b-form-group>
          </b-col>
          <b-col>
            <b-form-select
              id="tags-select"
              v-model="tags"
              :state="tagsState"
            >
              <template #first>
                <b-form-select-option :value="null" disabled>-- Please select tags --</b-form-select-option>
              </template>
              <!-- These options will appear after the ones from 'options' prop -->
              <b-form-select-option value="A">Tag A</b-form-select-option>
              <b-form-select-option value="B">Tag B</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group
              label="Owner:"
              label-for="owner-select"
              invalid-feedback="Owner is required"
              :state="ownerState"
            ></b-form-group>
          </b-col>
          <b-col>
            <b-form-select
              id="owner-select"
              v-model="owner"
              :state="ownerState"
            >
              <template #first>
                <b-form-select-option :value="null" disabled>-- Please select Owner --</b-form-select-option>
              </template>
              <!-- These options will appear after the ones from 'options' prop -->
              <b-form-select-option value="A">Owner A</b-form-select-option>
              <b-form-select-option value="B">Owner B</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group
              label-for="deletiondate-input"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-radio-group
                v-model="state"
                :aria-describedby="ariaDescribedby"
                aria-controls="ex-disabled-readonly"
              >  
              <b-form-row>
                <b-col>
                  <b-form-group   
                    label="Deletion Date:"  
                  ></b-form-group>
               </b-col>
                <b-col>
                  <b-form-radio
                      value="disable"
                    >Disable</b-form-radio>
                    <b-form-radio
                      value="normal"
                    >Enable</b-form-radio>
                 </b-col>
                 </b-form-row>          
              </b-form-radio-group> 
            </b-form-group> 
          </b-col>
          <b-col>
            <b-form-datepicker 
              id="datepicker"
              :disabled="disableddatepicker"
              v-model="deletionDate"
              :state="deletionDateState"
            ></b-form-datepicker>
          </b-col>
        </b-form-row>

        <b-form-group
          label="File:"
          label-for="video-file-input"
          invalid-feedback="Video File is required"
          :state="Boolean(videofile)"
        >
          <b-form-file
            id="video-file-input"
            v-model="videofile"
            accept="*.aac|*.aif|*.aifc|*.aiff|*.au|*.flac|*.m3u|*.m4a|*.mp3|*.oga|*.ogg|*.ra|*.ram|*.rm|*.wav|*.wma
                    *.3gp|*.asf|*.avi|*.dif|*.dv|*.f4v|*.flv|*.fmp4|*.m4v|*.mov|*.movie2|*.mp4|*.mpe|*.mpeg|*.mpg|*.ogv 
                    *.qt|*.rmvb|*.rv|*.swf|*.swfl|*.ts|*.webm|*.wmv"
            placeholder="Choose a file or drop it here..."
            :state="Boolean(videofile)"
            required
            
          ></b-form-file>
        </b-form-group>
      </form>
    </b-modal>
</template>

<script>

import axios from "axios";

export default {
  name: "create-video-modal",
  data() {
    return {
      filename:'',
      filenameState: null,
      privatevideo: [],
      privateState: null,
      anonymousembed: [],
      anonymousembedState: null,
      tags: '',
      tagsState: null,
      owner: '',
      ownerState: null,
      deletionDate: '',
      deletionDateState: null,
      state: "disable",
      videofile:[]
     };
  },
  computed: {
    disableddatepicker() {
        return this.state === "disable" 
    }     
  },
  methods: {
    resetCreateModal() {
        this.filename = ''
        this.filenameState = null
        this.privatevideo =  []
        this.privateState =  null
        this.anonymousembed =  []
        this.anonymousembedState =  null
        this.tags =  ''
        this.tagsState =  null
        this.owner =  ''
        this.ownerState =  null
        this.deletionDate =  ''
        this.deletionDateState =  null
        this.stat =  "disable"
        this.videofile = []
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.filenameState = valid
        this.privateState =  valid
        this.anonymousembedState =  valid
        this.tagsState =  valid
        this.ownerState =  valid
        this.deletionDateState =  (this.stat ===  "disable") ? '' : valid
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

        // Set formData
        const formData = new FormData();
        // Append the file
        formData.append('filename', this.filename);
        formData.append('privatevideo' ,this.privatevideo);
        formData.append('anonymousembed' ,this.anonymousembed);
        formData.append('tags' ,this.tags);
        formData.append('owner' ,this.owner);
        formData.append('deletionDate' ,this.deletionDate);
        formData.append('videofile' ,this.videofile);

        // try{
        //     this.$emit('initiateCreate', formData);
        // } catch(err){
        //   console.log(err);
        // }
        
       axios.post(`http://172.17.0.3:8000/videos`, formData,   {headers :  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
      
    },}).then((res) => {

     console.log(res)


}).catch((error) => {

    console.log(error)

})


   
    
       
    }
  }
};
</script>
<style >
.form-row{
  margin-bottom: 10px;
}
</style>