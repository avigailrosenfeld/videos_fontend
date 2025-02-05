<template>
  <div class="list row shadow p-3">
    <div class="col-md-12">
      <div class="list row mb-2">
        <div class="col-md-6">
          <h4>Users List</h4>
        </div>
        <div class="col-md-6">
              <b-button v-b-modal.create-user-modal variant="primary">
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
        id="users-table"
        striped
        hover
        :items="users"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        show-empty
      >
        <template #cell(index)="data">
          {{ ((currentPage-1) * perPage)+(data.index + 1) }}
        </template>
        <template #cell(delete)="data">
          <a @click="selectedUser=data.item" v-b-modal.confirmation-modal>
            <b-icon icon="trash-fill" variant="danger" aria-hidden="true"></b-icon>
          </a>
        </template>
        <template #cell(edit)="data">
          <a @click="selectedUser=data.item" v-b-modal.update-user-modal>
            <b-icon icon="pencil-fill" variant="primary" aria-hidden="true"></b-icon>
          </a>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="users-table"
        ></b-pagination>
    </div>
    
    <CreateUserModal
      v-on:initiateCreate="createUser"
    ></CreateUserModal>

    <UpdateUserModal
      v-on:initiateUpdate="updateUser"
      v-bind:user="selectedUser"
    ></UpdateUserModal>
   
    <Confirmation
      v-on:confirmationOk="deleteUser"
      v-bind:user="selectedUser"
    ></Confirmation>

  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import Confirmation from "./Confirmation";
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";

export default {
  name: "users-list",
  data() {
    return {
      selectedUser:{"id":null,"email":null},
      users: [],
      fields: ["index","name", "email","delete","edit"],
      currentPage: 1,
      perPage: 10,
    };
  },
  components:{
    Confirmation,
    CreateUserModal,
    UpdateUserModal
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    createUser(name,email,password){
      const body = {'name':name,'email':email, 'password':password}
      UserDataService.create(body)
        .then(response => {
          //this.users = response.data;
          this.retrieveUsers();
          this.makeToast('success',`Created user ${name}`, 'Success')
          console.log(response.data);
        })
        .catch(e => {
          this.makeToast('danger',e.response.data.message, 'Failed')
          console.log(e);
        });
      this.$nextTick(() => {
          this.$bvModal.hide('create-user-modal')
      })
    },
    updateUser(name,email,password){
      const body = {'name':name,'email':email,'password':password}
      if(this.selectedUser.email != null){
          UserDataService.update(this.selectedUser._id.$oid, body)
            .then(response => {
              //this.users = response.data;
              this.retrieveUsers();
              this.makeToast('success',`Update user ${this.selectedUser.email}`, 'Success')
              console.log(response.data);
            })
            .catch(e => {
              this.makeToast('danger',`Could not update user ${this.selectedUser.email}`, 'Failed')
              console.log(e);
            });
      }
      this.selectedUser = {"id": this.selectedUser.id,"email":this.selectedUser.email},
      this.$nextTick(() => {
          this.$bvModal.hide('update-user-modal')
      })
    },
    deleteUser(){
      if(this.selectedUser.email != null){
          UserDataService.delete(this.selectedUser._id.$oid)
            .then(response => {
              //this.users = response.data;
              this.retrieveUsers();
              this.makeToast('success',`Deleted user ${this.selectedUser.email}`, 'Success')
              console.log(response.data);
            })
            .catch(e => {
              this.makeToast('danger',`Could not delete user ${this.selectedUser.email}`, 'Failed')
              console.log(e);
            });
        }else{
          UserDataService.deleteAll()
            .then(response => {
              this.retrieveUsers();
              this.makeToast('success','Deleted All the users', 'Success')
              console.log(response.data);
            })
            .catch(e => {
              this.makeToast('danger','Could not delete all the users', 'Failed')
              console.log(e);
            });
        }
      this.selectedUser = {"id":null,"email":null},
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
        return this.users.length
      }
  },
  mounted() {
    this.retrieveUsers();
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
