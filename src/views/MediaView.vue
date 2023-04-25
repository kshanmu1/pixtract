<template>
    <v-container>
      <h3 style="text-align:center">IMAGES</h3>
      <v-container id="searchBar">
        <v-row style="text-align:center" class="d-flex justify-center">
          <v-col cols="2" sm="8">
            <v-text-field
              v-model="searchText"
              label="Search"
              append-icon="mdi-magnify"
  
            ></v-text-field>
          </v-col>
          <v-col cols="2" sm="1">
            <v-btn color="primary" dark @click="OnSearch" >Search</v-btn>
          </v-col>
          &nbsp;
          &nbsp;
          <v-col cols="2" sm="2">
            <v-btn
            class="mx-2"
            
            dark
            color="indigo"
            @click="onPickFile"
          >
            <!-- <v-icon dark>
              mdi-plus
            </v-icon> -->
            Add Image
          </v-btn>
          </v-col>
        </v-row>

      </v-container >
      <v-container id="folders">
        <v-card
        class="pa-3 ma-1"
        elevation="0"
        outlined
        color="gray"
         >
        <br/>
      <v-row>
        <v-col v-for="fld in folderDict" :key="fld.key">
          <v-chip
          class="ma-1"
          color="#d23369"
          :input-value="fld[1]"
          filter
          text-color="white"
          @click="categoryClicked(fld[0])"
        >
          <v-icon left>
            mdi-label
          </v-icon>
          {{fld[0]}}
        </v-chip>
        </v-col>
      </v-row>
        </v-card>
      </v-container>
      <v-container id="gallery">
        <v-row>
          <v-col
            v-for="pix in pixImages"
            :key="pix.id"
            class="d-flex child-flex"
            cols="3"
          >
            <v-img
              :src="pix.localPath"
              aspect-ratio="1"
              @click="openImagePopup(pix.name)"
              class="grey lighten-2"
              :id="pix.name"
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
import PixMedia from '@/models/pixmedia';
export default Vue.extend({
    name: 'MediaView',
    methods:{
      onPickFile(){
        (this.$refs.fileInput as any).click()
      },
     async onFilePicked(event:any)
     {
      const files = event.target.files
      const filename = files[0].name
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1]??"";
        const dataUri = `data:image/jpg;base64,${base64String}`;
        const pix = new PixMedia("img", filename, filename.split('.')[1], "", {Bucket:"pixtract"}, "","",[],"","","")
        const insertPix = new PixMedia("img", filename, filename.split('.')[1], "", {Bucket:"pixtract"}, "","",[],"","","")
        MediaController.insertMedia(insertPix,base64String); 
        pix.localPath = dataUri; 
        this.pixImages.push(pix);
        MediaController._mediaArray.push(pix);
        const folders = MediaController.getAllFolders(); 
        const folderDict = new Map<string,boolean>(); 
        folders.forEach((f)=>{
        folderDict.set(f, false); 
        })
        folderDict.set("All", true); 
        this.folders = folders; 
        this.folderDict = folderDict;
      };
     },
     OnSearch(){
      const imgs = this.allPixMedia;
      imgs.forEach(p => {p.searchTags.map(t => t.toUpperCase())}); 
      const searchImgResults :PixMedia[] = imgs.filter((p)=> p.searchTags.includes(this.searchText.toUpperCase()));
      this.pixImages = searchImgResults; 

     },
     FilterCategory(searchKey:string)
     {
      const imgs = this.allPixMedia;
      if(searchKey!="All"){
      const searchImgResults :PixMedia[] = imgs.filter((p)=> p.searchTags.includes(searchKey.toUpperCase()));
      this.pixImages = searchImgResults; 
      }else{
        this.resetPage(); 
      }
     },
     categoryClicked(folder:string)
     {
          if(this.folderDict.get(folder))
          {
             this.folderDict.set(folder,false);
             this.resetPage(); 
          }
          else{
            this.folderDict.set(folder,true);
            this.FilterCategory(folder); 
          }
     },
     openImagePopup(imgName:any){
      const id = imgName;
      const filPix:PixMedia = this.allPixMedia.find(p=>p.name==id)??{} as PixMedia;
      const datUri = filPix.localPath; 
      let image = new Image();
        image.src = datUri;
        let w = window.open("", imgName, "popup");
        w?.document.write(image.outerHTML);
     }, 
     resetPage()
     {
      const filteredMedia:PixMedia[] = []; 
      this.allPixMedia.forEach((pix)=>{
        if(pix.type=="img")
        {
          filteredMedia.push(pix);
        }
      });
      this.pixImages = filteredMedia; 
    }
    }, 
    async created(){
      const imgKeys = MediaController.mediaKeys; 
      const pixMedia:PixMedia[] = await MediaController.getAllMedia(); 
      const filteredMedia:PixMedia[] = []; 
      pixMedia.forEach((pix)=>{
        if(pix.type=="img")
        {
          filteredMedia.push(pix);
        }
      });
     const folders = await MediaController.getAllFolders(); 
     const folderDict = new Map<string,boolean>(); 
     folders.forEach((f)=>{
       folderDict.set(f, false); 
     })
     folderDict.set("All", true); 
     this.folders = folders; 
     this.folderDict = folderDict;
     this.pixImages = filteredMedia; 
     this.allPixMedia = pixMedia; 
     this.imageKeys = imgKeys; 

    },
    data() {
      const pixDefault:PixMedia[] =[] 
      const defFolderDict: Map<string,boolean> = new Map<string,boolean>(); 

      return {
       searchText:"",
       imageKeys: [""],
       pixImages: pixDefault,
       allPixMedia : pixDefault,
       folders:[""],
       folderDict:defFolderDict
    };
  }
});
</script> 

