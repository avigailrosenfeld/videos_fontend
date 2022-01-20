<template>
  <div class="video">
    <div class="shadow bg-body rounded" v-for="video in videos" :key="video.id"
      >{{ video.title }}
      <div class="card-footer mt-4">
        <router-link :to="{ name: 'video_details', params: { id: video.id } }"
          >Read More</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      videos: [],
    };
  },

  created() {
    axios
      .get("http://127.0.0.1:5000/ape_blog/api/v1.0/videos")
      .then((response) => {
        this.videos = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style>
.shadow {
  width: 24rem;
  margin-top: 30px;
  height: 7rem;
}
.shadow:hover {
  border: 3px solid #2196f3;
  width: 30rem;
}
.shadow a {
  text-decoration: none;
}
.video {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  flex-direction: row;
  flex-flow: row wrap;
}
</style>