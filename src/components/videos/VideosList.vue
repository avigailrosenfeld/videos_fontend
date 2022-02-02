<template>
  <div class="list row shadow p-3">
    <div class="col-md-12">
      <div class="list row mb-2">
        <div class="col-md-6">
          <h4>Videos List</h4>
        </div>
        <div class="col-md-6">
              <b-button v-b-modal.create-video-modal variant="primary">
                <b-icon icon="plus" aria-hidden="true"></b-icon>Create
              </b-button>
              <b-button variant="danger align-right ml-3" v-b-modal.confirmation-modal>
                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>Delete All
              </b-button> 
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <b-table 
        id="videos-table"
        striped
        hover
        :items="videos"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        show-empty
      >
        <template #cell(index)="data">
          {{ ((currentPage-1) * perPage)+(data.index + 1) }}
        </template>
        <template #cell(delete)="data">
          <a @click="selectedVideo=data.item" v-b-modal.confirmation-modal>
            <b-icon icon="trash-fill" variant="danger" aria-hidden="true"></b-icon>
          </a>
        </template>
        <template #cell(edit)="data">
          <a @click="selectedVideo=data.item" v-b-modal.update-video-modal>
            <b-icon icon="pencil-fill" variant="primary" aria-hidden="true"></b-icon>
          </a>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="videos-table"
        ></b-pagination>
    </div>
    
    <CreateVideoModal
      v-on:initiateCreate="createVideo"
    ></CreateVideoModal>

    <UpdateVideoModal
      v-on:initiateUpdate="updateVideo"
      v-bind:video="selectedVideo"
    ></UpdateVideoModal>
   
    <Confirmation
      v-on:confirmationOk="deleteVideo"
      v-bind:video="selectedVideo"
    ></Confirmation>

  </div>
</template>

<script>
import VideoDataService from "../../services/VideoDataService";
import Confirmation from "./Confirmation";
import CreateVideoModal from "./CreateVideoModal";
import UpdateVideoModal from "./UpdateVideoModal";

export default {
  name: "videos-list",
  data() {
    return {
      selectedVideo:{"id":null,"filename":null},
      videos: [],
      fields: ["index","filename", "size","delete","edit"],
      currentPage: 1,
      perPage: 10,
    };
  },
  components:{
    Confirmation,
    CreateVideoModal,
    UpdateVideoModal
  },
  methods: {
    retrieveVideos() {
      VideoDataService.getAll()
        .then(response => {
          this.videos = response.data;
          console.log(response.data);
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    createVideo(filename,size){
      const body = {'filename':filename,'size':size}
      VideoDataService.create(body)
        .then(response => {
          //this.videos = response.data;
          this.retrieveVideos();
          this.makeToast('success',`Created video ${filename}`, 'Success')
          console.log(response.data);
        })
        .catch(e => {
          this.makeToast('danger',e.response.data.message, 'Failed')
          console.log(e);
        });
      this.$nextTick(() => {
          this.$bvModal.hide('create-video-modal')
      })
    },
    updateVideo(filename,size){
      const body = {'filename':filename,'size':size}
      if(this.selectedVideo.filename != null){
          VideoDataService.update(this.selectedVideo._id.$oid, body)
            .then(response => {
              //this.videos = response.data;
              this.retrieveVideos();
              this.makeToast('success',`Update video ${this.selectedVideo.filename}`, 'Success')
              console.log(response.data);
            })
            .catch(e => {
              this.makeToast('danger',`Could not update video ${this.selectedVideo.filename}`, 'Failed')
              console.log(e);
            });
      }
      this.selectedVideo = {"id": this.selectedVideo.id,"filename":this.selectedVideo.filename},
      this.$nextTick(() => {
          this.$bvModal.hide('update-video-modal')
      })
    },
    deleteVideo(){
      if(this.selectedVideo.filename != null){
          VideoDataService.delete(this.selectedVideo._id.$oid)
            .then(response => {
              //this.videos = response.data;
              this.retrieveVideos();
              this.makeToast('success',`Deleted video ${this.selectedVideo.filename}`, 'Success')
              console.log(response.data);
            })
            .catch(e => {
              this.makeToast('danger',`Could not delete video ${this.selectedVideo.filename}`, 'Failed')
              console.log(e);
            });
        }else{
          VideoDataService.deleteAll()
            .then(response => {
              this.retrieveVideos();
              this.makeToast('success','Deleted All the videos', 'Success')
              console.log(response.data);
            })
            .catch(e => {
              this.makeToast('danger','Could not delete all the videos', 'Failed')
              console.log(e);
            });
        }
      this.selectedVideo = {"id":null,"filename":null},
      this.$nextTick(() => {
          this.$bvModal.hide('confirmation-modal')
      })
    },
    makeToast(variant = null, message = null, title=null) {
        this.$bvToast.toast(`${message || 'Failed'}`, {
          title: `${title || 'Failed'}`,
          variant: variant,
          autoHideDelay: 5000,
          appendToast: true
        })
      }
  },
  computed: {
      rows() {
        return this.videos.length
      }
  },
  mounted() {
    this.retrieveVideos();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
