import IMediaController from "@/interfaces/media-controller-interface";
import PixMedia from "@/models/pixmedia";
import DynamooDbService from "@/services/dynamodb-service";
import RekognitionService from "@/services/rekognition-service";
import SimpleStorageService from "@/services/s3-service"
import TextractService from "@/services/textract-service";

export default new class MediaController
{
     _mediaArray : PixMedia[];

    mediaKeys : string[] = []; 

    constructor()
    {
        this._mediaArray = []; 
    }

    //YH
    //Get all PixMedia objects from T_Media_Master table
    //Check if all media is available on client machine? if not, download from s3
    //Populate __mediaAttay internal State Obj. 
    async getAllMedia(): Promise<PixMedia[]> {
        if(this._mediaArray.length>0)
        return this._mediaArray;

        const allMedia : PixMedia[] = await DynamooDbService.getAllRowsMediaMaster();
        console.log("GETALLMEDIA")
        console.log(allMedia)
        allMedia.forEach(async (pix)=>{
             const imgStr = await SimpleStorageService.downloadMedia(pix.name)
             pix.localPath = imgStr??""; 
             localStorage.setItem(pix.name, imgStr??"");
             this.mediaKeys.push(pix.name);
        })
        
        this._mediaArray = allMedia; 

        console.log("TEST IN CONTROLLER")
        return this._mediaArray; 
    }
    
    async fetchAllMediaAndUpdateCache() {
        const allMedia : PixMedia[] = await DynamooDbService.getAllRowsMediaMaster();
        console.log("FETCH")
        console.log(allMedia)
        allMedia.forEach(async (pix)=>{
             const imgStr = await SimpleStorageService.downloadMedia(pix.name)
             pix.localPath = imgStr??""; 
             localStorage.setItem(pix.name, imgStr??"");
             this.mediaKeys.push(pix.name);
        })
        
        this._mediaArray = allMedia; 
    }
    //YH
    //Check __mediaArray. Else,
    //Get PixMedia object by by media Id
    //Check local image file exists? else download s3
    getMediaById(id: string): PixMedia {
        throw new Error("Method not implemented.");
    }

    //KS
    //Upload to s3
    //Call Rekognition
    //Create PixMedia obj
    //Insert t_media_master
    //add to __mediaArray
    addMedia(localPath: string, name: string): boolean {
        throw new Error("Method not implemented.");
    }

    async insertMedia(pixmedia:PixMedia, imgStr:string)
    {

        console.log(pixmedia.name); 
        this._mediaArray.push(pixmedia);
        await SimpleStorageService.uploadMedia(pixmedia,imgStr); 
        const metadata = await RekognitionService.getMediaMetadata(pixmedia.name);
        pixmedia.searchTags = metadata.map((tag)=> tag.toUpperCase());
        console.log("updatedPix");
        console.log(pixmedia);//Avoid max 400KB exception for dynamoDB 
        await DynamooDbService.insertMedia(pixmedia);
      //  await this.fetchAllMediaAndUpdateCache();

    }


    async insertNote(pixmedia:PixMedia, imgStr:string)
    {

        console.log(pixmedia.name); 
        this._mediaArray.push(pixmedia);
        await SimpleStorageService.uploadMedia(pixmedia,imgStr); 
        const metadata = await TextractService.getMediaMetadata(pixmedia.name);
        console.log("TEXTRACT RESP");
        console.log(metadata);
        pixmedia.searchTags = metadata.map((tag)=> tag.toUpperCase());
        let digitizedStr = "";
        metadata.forEach(str => {
           digitizedStr = digitizedStr+" "+str; 
        });
        pixmedia.digitizedNoteDocLocal = digitizedStr; 
        console.log("updatedPix");
        console.log(pixmedia);//Avoid max 400KB exception for dynamoDB 
        await DynamooDbService.insertMedia(pixmedia);
      //  await this.fetchAllMediaAndUpdateCache();

    }


    //KS
    //Get all PixMedia--distinct foldername []
    getAllFolders(){
        const folderMap = new Map<string,number>();
        const result:string[] = [];
        const mediaPix = this._mediaArray.filter(pix => pix.type=="img");
        console.log("filtered");
        console.log(mediaPix)
        mediaPix.forEach((pix)=>{
            pix.searchTags.forEach((tag)=>{
                if(folderMap.get(tag))
                {   const newVal = (folderMap.get(tag)??0)+1 
                    folderMap.set(tag,newVal)
                }
                else{
                    folderMap.set(tag,1); 
                }
            })
        });
        console.log("FolderMap");
        console.log(folderMap);
        for (const [key, value] of folderMap.entries()) {
            if (value > 1) {
              result.push(key);
            }
          }
        
        return result; 
     }

     getAllFoldersForNotes(){
        const folderMap = new Map<string,number>();
        const result:string[] = [];
        const notesPix = this._mediaArray.filter(pix => pix.type=="notes");
        notesPix.forEach((pix)=>{
            pix.searchTags.forEach((tag)=>{
                if(folderMap.get(tag))
                {   const newVal = (folderMap.get(tag)??0)+1 
                    folderMap.set(tag,newVal)
                }
                else{
                    folderMap.set(tag,1); 
                }
            })
        });
        console.log("FolderMap");
        console.log(folderMap);
        for (const [key, value] of folderMap.entries()) {
            if (value > 1) {
              result.push(key);
            }
          }
        
        return result; 
     }

    //KS
    //Get pixmedia in pixmedia array :: foldername==foldername
    getMediaForFolder(folderName: string): PixMedia[] {
        throw new Error("Method not implemented.");
    }
    
}