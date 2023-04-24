
/// <reference types="node" />
import axios from 'axios';
import fs from 'fs';
import {Buffer} from 'buffer'
import PixUtils from './pixtract-utils';
import PixMedia from '@/models/pixmedia';
window.Buffer = window.Buffer || Buffer;

//KS
export default new class SimpleStorageService {
    private _BASE_URL = "https://21pyee8jrg.execute-api.us-east-2.amazonaws.com/dev"; 
    private __BUCKET = "pixtract"
    private __URL = this._BASE_URL+"/"+this.__BUCKET; 
    private _destinationPath = '../../public';
    private _UploadUrl = "https://0p3zt24f1b.execute-api.us-east-2.amazonaws.com/dev"
  
    public async uploadMedia(media:PixMedia, base64ImgStr:string) 
    {
        //const data = PixUtils.base64ToArrayBuffer(base64ImgStr); 
        const reqBody={
          filename : media.name,
          base64Encoded : base64ImgStr
        }
        const response = await axios.post(this._UploadUrl, reqBody);
        console.log(`Image uploaded to S3. Response status: ${response.status}`);
    } catch (error:any) {
      console.error(`Error uploading image to S3: ${error.message}`);
    }

    public async downloadMedia(fileName: string){
        try {
          const fullURL = this.__URL+"/"+fileName
          const response = await axios.get(fullURL, {responseType: 'arraybuffer'});
         // console.log(response)
          // const url = window.URL.createObjectURL(new Blob([response.data]))
          // // console.log(`File downloaded from S3 to ${url}. Response status: ${response.status}`);
          // // const link = document.createElement('a')
          // // link.href = url
          // // link.setAttribute('download', 'tt_t.jpg');
          // // document.body.appendChild(link)
          // // link.click(); 
          // const reader = new FileReader()
          // reader.readAsDataURL(response.data)
          // reader.onloadend = () => {
          //  localStorage.setItem('imageData', reader.result as string)
          //  }
          const dataUri = `data:image/jpg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
        //  const imgDataURI_64 = PixUtils.getBase64Image(response.data);
         // console.log(dataUri); 
          return dataUri; 
        } catch (error:any) {
          console.error(`Error downloading file from S3: ${error.message}`);
        }
      }

    }

