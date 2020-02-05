<template>
  <v-container style="background-color: white; width: 40%;" class="d-flex flex-column">
        <div class="ml-2">
            <h2> {{ title }} </h2>
            <p class="mt-2"> {{ message }} </p>
        </div>
        <v-row row justify="end mr-2 mt-2">
            <v-btn color="primary" @click="onConfirmTap()">Confirm</v-btn>
            <v-btn color="grey" class="ml-2" @click="onCloseTap()">Cancel</v-btn>
        </v-row>
  </v-container>
</template>

<script>
export default {
    props: ["title", "message"],
    data() {
        return {

        }
    },
    methods: {
        onConfirmTap(){
            this.$emit('closeModal', true);
        },

        onCloseTap(){
            this.$emit('closeModal', false);
        },
    }
}
</script>

<style>

</style>