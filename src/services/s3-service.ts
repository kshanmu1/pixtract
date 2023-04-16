
/// <reference types="node" />
import axios from 'axios';
import fs from 'fs';

export default new class SimpleStorageService {
    private _BASE_URL = "https://21pyee8jrg.execute-api.us-east-2.amazonaws.com/dev/"; 
    private __BUCKET = "pixtract"
    private __URL = this._BASE_URL+"/"+this.__BUCKET; 
  
    public async uploadMedia(localPath:string) 
    {
        const data = fs.readFileSync(localPath);
        const response = await axios.put(this.__URL, data);
        console.log(`Image uploaded to S3. Response status: ${response.status}`);
    } catch (error:any) {
      console.error(`Error uploading image to S3: ${error.message}`);
    }

    public async downloadMedia(destinationPath: string){
        try {
          const response = await axios.get(this.__URL, { responseType: 'arraybuffer' });
          fs.writeFileSync(destinationPath, Buffer.from(response.data, 'binary'));
          console.log(`File downloaded from S3 to ${destinationPath}. Response status: ${response.status}`);
          return destinationPath; 
        } catch (error:any) {
          console.error(`Error downloading file from S3: ${error.message}`);
        }
      }

    }
