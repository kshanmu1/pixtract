import IPixUtils from "@/interfaces/pixtract-util-interface";

//KS
export default new class PixUtils  implements IPixUtils{

    //prefix:username_filename_UUID
    getUniqueName(name:string):string {
        return "";
    }


    //UUID
    getNewUUID():string{
        return ""; 
    }

    getBase64Image(img:any):string {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
    
        const dataURL = canvas.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

}