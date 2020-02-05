<template>
  <v-container>
    
    <!--- Modal page: Add new person -->
    <div>
      <transition name="modal">
        <div v-if="newUserModal">
          <div class="overlay" @click.self="newUserModal = false;">
            <UserForm @closeModal="onAddUserFinished" class="modal"/>
          </div>
        </div>
      </transition>
    </div>
    <!-----             -------->

    <!--- Modal page: Delete person -->
    <div>
      <transition name="modal">
        <div v-if="deletePersonModal">
          <div class="overlay" @click.self="deletePersonModal = false;">
            <ConfirmDialog title="Delete Person" @closeModal="onDeleteDialogClose"
            :message="'Are you sure you want to remove ' + userToDelete.name + '?'" />
          </div>
        </div>
      </transition>
    </div>

    <v-card>
      <v-card-title>
        Person Informations
        <v-btn color="primary" class="ml-4" @click="addUser">Add new Person</v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
      >
        <template v-slot:item.phone="{item}">
          <span>{{ item.phone | phoneMask }}</span>
        </template>
        <template v-slot:item.createdAt="{item}">
          <span>{{ item.createdAt | dateMask }}</span>
        </template>
        <template v-slot:item.action="{item}">     
          <v-icon color="red" medium @click="onDeleteTap(item)" text>
            {{ 'mdi-delete' }}
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { db } from '../firebase';
  import UserForm from '../components/UserForm';
  import ConfirmDialog from '../components/ConfirmDialog';
  import StringMask from 'string-mask';
  import moment from 'moment';

  export default {
    name: 'HelloWorld',
    components: {
      UserForm,
      ConfirmDialog
    },
    data: () => ({
      newUserModal: false,
      deletePersonModal: false,
      search: '',
      headers: [
        {
          text: "Name",
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: "Phone",
          align: 'left',
          sortable: false,
          value: 'phone'
        },
        {
          text: "Registration Date",
          align: 'center',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: "Action",
          align: 'center',
          sortable: true,
          value: 'action'
        }
      ],
      users: [],
      userToDelete: {},
    }),

    filters: {
      phoneMask: function(value){
        if(!value) return '';

        let mask = new StringMask('000-0000');
        return mask.apply(value);
      },

      dateMask: function(value){
        return moment(value.toDate()).format('MMMM Do YYYY, h:mm:ss a');
      }
    },

    mounted(){
      console.log(db.collection('users'));
    },

    firestore() {
      return {
        users: db.collection('users'),
      }
    },

    methods: {
      onDeleteTap: function(user){
        this.userToDelete = user
        this.deletePersonModal = !this.deletePersonModal;
      },

      onDeleteDialogClose: function(result){
        if(result)
          this.$firestore.users.doc(this.userToDelete['.key']).delete();
        else
          return;

        this.userToDelete = {};
        this.deletePersonModal = false;
      },

      addUser: function(){
        this.newUserModal = !this.newUserModal;
      },

      onAddUserFinished: function(payload){
        this.newUserModal = false;
        if(payload){
          payload.createdAt = new Date();
          this.$firestore.users.add(payload);
        }
      }
    }
  }
</script>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #00000094;
    z-index: 999;
    transition: opacity 0.2s ease;
    border-radius: 4px;
  }
</style>