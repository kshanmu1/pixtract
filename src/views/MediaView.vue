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
            <v-btn color="primary" @click="OnSearch" >Search</v-btn>
          </v-col>
          <v-col cols="12" sm="1">
            <v-btn
            class="mx-2"
            fab
            dark
            color="indigo"
            @click="onPickFile"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col
            v-for="pix in pixImages"
            :key="pix.id"
            class="d-flex child-flex"
            cols="4"
          >
            <v-img
              :src="pix.localPath"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
     </v-container>
     <v-container>
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"/>
     </v-container>
    </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import MediaController from "../controllers/media-controller"
import SimpleStorageService from "../services/s3-service"
import DynamoDbService from "../services/dynamodb-service"
import PixMedia from '@/models/pixmedia';
import MediaType from'@/interfaces/media-type';
export default Vue.extend({
    name: 'MediaView',
    methods:{
      onPickFile(){
        (this.$refs.fileInput as any).click()
      },
     onFilePicked(event:any)
     {
      const files = event.target.files
      const filename = files[0].name
      console.log("Filename : " + filename);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1]??"";
        const dataUri = `data:image/jpg;base64,${base64String}`;
        console.log(dataUri);
        console.log("Converted to base64");
        console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
        console.log(filename); 
        const pix = new PixMedia("img", filename, filename.split('.')[1], "", {Bucket:"pixtract"}, "","",[],"","","")
        pix.localPath = dataUri; 
        MediaController.insertMedia(pix,base64String); 
        this.pixImages.push(pix);

      };
      console.log("Picked"); 
     },
     OnSearch(){
      const imgs = this.allPixMedia;
      const searchImgResults = imgs.filter((p)=> p.searchTags.includes(this.searchText.toLocaleUpperCase()));
      this.pixImages = searchImgResults; 
      console.log("search!!" + this.searchText); 
      console.log(this.pixImages);
     }
    }, 
    async created(){
     // const img64 = await SimpleStorageService.downloadMedia("elephant.jpg"); 
      const imgKeys = MediaController.mediaKeys; 
      const pixMedia:PixMedia[] = await MediaController.getAllMedia(); 
      let keyArr = [];
      const filteredMedia:PixMedia[] = []; 
      pixMedia.forEach((pix)=>{
        if(localStorage.getItem(pix.name))
        {
          filteredMedia.push(pix);
        }
      });
     console.log(filteredMedia);
     this.pixImages = filteredMedia; 
     this.allPixMedia = filteredMedia; 
     this.imageKeys = imgKeys; 

    },
    data() {
      const controller = MediaController.getAllMedia(); 
      const pixDefault:PixMedia[] =[] 
      return {
       searchText:"",
       imageKeys: [""],
       pixImages: pixDefault,
       allPixMedia : pixDefault
    };
  }
});
</script> 

