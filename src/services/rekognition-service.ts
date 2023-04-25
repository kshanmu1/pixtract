
/// <reference types="node" />
import ImageRekognitionResponse from '@/interfaces/rekognition-response-interface';
import axios from 'axios';

//KG
export default new class RekognitionService {
    private __URL = "https://n02ouewhm7.execute-api.us-east-2.amazonaws.com/dev"; 
    private _MIN_CONF = 96; 
    private _BUCKET = "pixtract"
    private _MAX_LABELS = 50

    public async getMediaMetadata(fileName: string): Promise<string[]> {
      console.log("Calling AWS REKOGNITION Service for Image Processing ... ")
        try {
            const reqBody = {
                bucket:this._BUCKET,
                key : fileName,
                maxLabels : this._MAX_LABELS,
                minConfidence: this._MIN_CONF
              }
          const response = await axios.post<ImageRekognitionResponse>(this.__URL, reqBody );
          console.log(" Image Processed :  Rekognition Response => ");
          console.log(response); 
          if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
          }
          const fieldValues: string[] = response.data.body.Labels.map(label => label.Name);
          return fieldValues;
        } catch (error:any) {
          console.error(`Error calling API: ${error.message}`);
          throw error;
        }
      }


    }
