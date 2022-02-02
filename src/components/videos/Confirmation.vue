<template>
    <b-modal 
      id="confirmation-modal"
      title="Delete video"
      ref="modal"
      @ok="confirmationOk"
      >
      <p v-if="video.id" class="my-4">Are you sure you want to delete the user: {{video.id}}</p>
      <p v-else class="my-4">Are you sure you want to delete all the users</p>
    </b-modal>
</template>

<script>
export default {
  name: "confirmation",
  props: ['video'],
  methods: {
    confirmationOk() {
      this.$emit('confirmationOk');
    }
  }
};
</script>