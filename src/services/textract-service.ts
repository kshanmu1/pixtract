
/// <reference types="node" />
import TextractResponse from "../interfaces/textract-response-interface"
import axios from 'axios';

//KG & KS
export default new class TextractService {
    private __URL = "https://gmcotx7b8j.execute-api.us-east-2.amazonaws.com/dev"; 
    private _MIN_CONF = 96; 
    private _BUCKET = "pixtract"
    private _MAX_LABELS = 50

    public async getMediaMetadata(fileName: string): Promise<string[]> {
        try {
            const reqBody = {
                bucket:this._BUCKET,
                key : fileName
                // maxLabels : this._MAX_LABELS,
                // minConfidence: this._MIN_CONF
              }
          const response = await axios.post<TextractResponse>(this.__URL, reqBody );
          if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
          }
          const blocks = response.data.body.Blocks;
          const blocksArray: string[] = blocks.map(block => block.Text??"");
          return blocksArray;
        } catch (error:any) {
          console.error(`Error calling API: ${error.message}`);
          throw error;
        }
      }
    }
