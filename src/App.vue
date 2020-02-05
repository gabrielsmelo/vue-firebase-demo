<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-img
        class="mx-2"
        :src="images.firebase"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      +
      <v-img
        class="mx-2 ml-4"
        :src="images.vue"
        max-height="28"
        max-width="28"
        contain
      ></v-img>

      <v-toolbar-title class="ml-2"> Firebase Vue - Demo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{on}">
          <v-btn
            href="https://console.firebase.google.com/u/2/project/fir-vue-demo-27827/database/firestore/data~2Fusers~2FagGKMNIZn8QK5icJlZbq"
            target="_blank"
            text
            v-on="on"
          >
            <span class="mr-2">See data in Firestore
            </span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </template>
        <span>Be sure you're logged in Firebase and already have access to the project</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <UserList/>
    </v-content>
  </v-app>
</template>

<script>
import UserList from './views/UserList';

export default {
  name: 'App',

  components: {
    UserList,
  },

  data: () => ({
    images: {
      firebase: require('./assets/firebase-logo.png'),
      vue: require('./assets/vue-logo.png')
    }
  }),
};
</script>

<style scoped>

</style>
