/// <reference types="node" />
import DynamoDBResponse from '@/interfaces/dynamo-db-response';
import DynamoDBMedia from '@/interfaces/dynamo-db-media';
import axios from 'axios';

export default new class DynamoDbService {
    private __GET_URL = "https://ljrsuwn2b4.execute-api.us-east-2.amazonaws.com/dev"; 
    private __INSERT_URL = "https://vsjk21yhii.execute-api.us-east-2.amazonaws.com/dev"; 

    public async getAllRowsMediaMaster(): Promise<DynamoDBResponse> {
        try {
            const response = await axios.post<DynamoDBResponse>(this.__GET_URL);
            if (response.status !== 200) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
            return response.data;
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

    public async insertMedia(media: DynamoDBMedia): Promise<DynamoDBResponse> {
        try {
            const reqBody = {
                media: media
            };
            const response = await axios.post<DynamoDBResponse>(this.__INSERT_URL, reqBody);
            if (response.status !== 200) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
            return response.data;
        } catch (error: any) {
            console.error(`Error calling API: ${error.message}`);
            throw error;
        }
    }
}
