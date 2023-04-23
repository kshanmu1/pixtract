import IPixUtils from "@/interfaces/pixtract-util-interface";
import uuid from 'uuid'; 
//KS
export default new class PixUtils{

    //prefix:username_filename_UUID
    getUniqueName(name:string):string {
        return name; 
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

    base64ToArrayBuffer(base64:string) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

}