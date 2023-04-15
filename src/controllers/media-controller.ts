import IMediaController from "@/interfaces/media-controller-interface";
import PixMedia from "@/models/pixmedia";


export default new class MediaController implements IMediaController
{
    private _mediaArray : PixMedia[];

    constructor()
    {
        this._mediaArray = []; 
    }


    //Get all PixMedia objects from T_Media_Master table
    //Check if all media is available on client machine? if not, download from s3
    //Populate __mediaAttay internal State Obj. 
    getAllMedia(): PixMedia[] {
        throw new Error("Method not implemented.");
    }
     
    //Check __mediaArray. Else,
    //Get PixMedia object by by media Id
    //Check local image file exists? else download s3
    getMediaById(id: string): PixMedia {
        throw new Error("Method not implemented.");
    }

    //Upload to s3
    //Call Rekognition
    //Create PixMedia obj
    //Insert t_media_master
    //add to __mediaArray
    addMedia(localPath: string, name: string): boolean {
        throw new Error("Method not implemented.");
    }

    //Upload to s3
    //Call Textract
    //Create PixMedia obj
    //Insert t_media_master
    //add to __mediaArray
    addNote(localPath: string, name: string): boolean {
        throw new Error("Method not implemented.");
    }


    //Get all PixMedia--distinct foldername []
    getAllFolders(): string[] {
        throw new Error("Method not implemented.");
    }

    //Get pixmedia in pixmedia array :: foldername==foldername
    getMediaForFolder(folderName: string): PixMedia[] {
        throw new Error("Method not implemented.");
    }
    
}