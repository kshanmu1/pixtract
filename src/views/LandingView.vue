<template>
    <v-layout>
        <!-- <v-app-bar color="#005A43" app clipped-left flat dark>
          </v-app-bar> -->
           <v-navigation-drawer app dark  color="#2a3990" flat >
            <v-list>
              <v-list-item class="px-2">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>
    
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    {{username || 'Username'}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-light" v-on:click="logout">
                    Log Out
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
    
          <v-divider></v-divider>
    
          <v-list nav>
            <!-- <v-list-item v-on:click="showDashboardView" link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title > Dashboard </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item v-on:click="showMediaView" link>
            <v-list-item-icon>
              <v-icon>mdi-camera</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title > Images </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-on:click="showNotesView" link>
            <v-list-item-icon>
              <v-icon>mdi-text</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title > Notes </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </v-list>
        </v-navigation-drawer>
      <v-main>
        <v-container v-if="currentView.notes">
          <NotesView />
        </v-container>
        <v-container v-if="currentView.media">
          <MediaView />
        </v-container>
      </v-main>
    </v-layout>
</template>
    
    <script>
    import MediaView from "../views/MediaView.vue"
    import NotesView from "../views/NotesView.vue"
    import SimpleStorageService from '../services/s3-service'
      export default {
        name:"DashboardView",
        components:{
          MediaView,
          NotesView
        },
        data () {
          // const img = SimpleStorageService.downloadMedia("elephant.jpg", window);
          // console.log(img);
          return {
            username:this.$route.params.username,
            currentView:{
              media:true,
              notes:false
            }
          }
        },
        methods: {
          resetAllViews(){
              this.currentView.media = false;
              this.currentView.notes = false;
          },
          logout() {
            this.$router.replace({name:'login'})
          },
          showNotesView()
          {
            this.resetAllViews(); 
            this.currentView.notes = true;
          },
          showMediaView()
          {
            this.resetAllViews(); 
            this.currentView.media = true;
          },

        }
      }
    </script>