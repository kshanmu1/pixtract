import IMediaController from "@/interfaces/media-controller-interface";
import PixMedia from "@/models/pixmedia";
import DynamooDbService from "@/services/dynamodb-service";
import RekognitionService from "@/services/rekognition-service";
import SimpleStorageService from "@/services/s3-service"

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
        const allMedia : PixMedia[] = await DynamooDbService.getAllRowsMediaMaster();
        console.log("GETALLMEDIA")
        console.log(allMedia)
        allMedia.forEach(async (pix)=>{
             const imgStr = await SimpleStorageService.downloadMedia(pix.name)
             pix.localPath = imgStr??""; 
             this.mediaKeys.push(pix.name);
        })
        
        this._mediaArray = allMedia; 

        console.log("TEST IN CONTROLLER")
        return this._mediaArray; 
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
        console.log(pixmedia);
        await DynamooDbService.insertMedia(pixmedia)

    }


    //KS
    //Get all PixMedia--distinct foldername []
    getAllFolders(): string[] {
        throw new Error("Method not implemented.");
    }

    //KS
    //Get pixmedia in pixmedia array :: foldername==foldername
    getMediaForFolder(folderName: string): PixMedia[] {
        throw new Error("Method not implemented.");
    }
    
}