/// <reference types="node" />
import DynamoDBResponse from '@/interfaces/dynamo-db-response';
import DynamoDBMedia from '@/interfaces/dynamo-db-media';
import axios from 'axios';
import PixMedia from '@/models/pixmedia';

export default new class DynamoDbService {
    private __GET_URL = "https://ljrsuwn2b4.execute-api.us-east-2.amazonaws.com/dev"; 
    private __INSERT_URL = "https://vsjk21yhii.execute-api.us-east-2.amazonaws.com/dev"; 

    public async getAllRowsMediaMaster(): Promise<PixMedia[]> {
        console.log("Getting all rows from DynamoDB: T_MEDIA_MASTER ... "); 
        try {
            const response = await axios.post(this.__GET_URL);
            if (response.status !== 200) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
            const awaitedData = await response.data; 
            const resArray: PixMedia[] = JSON.parse(awaitedData.body.data)
            console.log("Response : T_MEDIA_MASTER ALL ROWS : ")
            console.log(resArray); 
            return resArray;
        } catch (error:any) {
            console.error(`Error calling API: ${error.message}`);
            throw error;
        }
    }

    public async getAllRowsMediaMasterById(keyword: string): Promise<DynamoDBResponse> {
        try {
            const reqBody = {
                id: keyword
            };
            const response = await axios.post<DynamoDBResponse>(this.__GET_URL, reqBody);
            if (response.status !== 200) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
            return response.data;
        } catch (error:any) {
            console.error(`Error calling API: ${error.message}`);
            throw error;
        }
    }

    public async insertMedia(media: PixMedia): Promise<DynamoDBResponse> {
        try {
            console.log("Inserting PixMedia Object into DynamoDB:T_MEDIA_MASTER ... ")
            media.localPath=""; 
            const reqBody = {
                media: [media]
            };
            const response = await axios.post<DynamoDBResponse>(this.__INSERT_URL, reqBody);
            if (response.status !== 200) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
            console.log("Inserted PixMedia Object into DynamoDB: T_MEDIA_MASTER");
            return response.data;
        } catch (error: any) {
            console.error(`Error calling API: ${error.message}`);
            throw error;
        }
    }
}
