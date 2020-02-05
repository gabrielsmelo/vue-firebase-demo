<template>
    <v-container style="background-color: white; width: 500px;">
        <h1>Add User</h1>
        <v-form class="mt-5" ref="form" v-model="valid" :lazy-validation="true">
            <v-text-field v-model="name" placeholder="Johnny Cash" :rules="validNameNotEmpty" 
            label="Name*" required/>

            <v-text-field v-model="phone" placeholder="XXX-XXXX"
            label="Phone Number*" @keyup="onPhoneChanged" :rules="notEmpty" required/>
        </v-form>
        <v-row row justify="end" class="mr-2">
            <v-btn color="primary" @click="onSaveTap()">Save</v-btn>
            <v-btn color="grey" class="ml-2" @click="onCloseTap()">Cancel</v-btn>
        </v-row>
    </v-container>
</template>

<script>
import StringMask from 'string-mask';

export default {
    data(){
        return{
            valid: true,
            name: '',
            phone: '',
            notEmpty: [
                v => !!v || 'You need to fill this field.'
            ],
            validNameNotEmpty: [
                v => !!v || 'You need to fill this field.',
                v => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(v) || "Please enter a valid name."
            ],
        };
    },

    methods: {
        onCloseTap(){
            this.$emit('closeModal');
        },

        onPhoneChanged(){
            let mask = new StringMask('000-0000');
            let maskResult = mask.apply(this.phone.replace(/[\W_]/g, ""));
            if(this.phone !== maskResult)
                this.phone = maskResult;
        },

        onSaveTap(){
            let payload = {
                name: this.name,
                phone: Number(this.phone.replace(/\D/g, ""))
            };

            this.$emit('closeModal', payload);
            
        },
    }
}
</script>

<style scoped>
</style>