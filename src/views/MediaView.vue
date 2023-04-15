<template>
    <v-container>
      Media
      <v-container >
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="searchText"
              label="Search"
              append-icon="mdi-magnify"
  
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn color="primary"  >Search</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'MediaView',
    methods:{
  
    }, 
    data() {
    
      return {
       searchText:""
    };
  }
});
</script> 

