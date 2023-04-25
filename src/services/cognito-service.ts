/// <reference types="node" />
import ImageRekognitionResponse from '@/interfaces/rekognition-response-interface';
import axios from 'axios';

//KG
export default new class CognitoService {
    private __URL = "https://8a3qzhu797.execute-api.us-east-2.amazonaws.com/prod/authenticate"; 

    public async validateCognito(username: string, password:string): Promise<string> {
        console.log(`Authenticating User : ${username} via Cognito ... `);

        try {
            const reqBody = {
                "username": username,
                "password": password
              }
          const response = await axios.put(this.__URL, reqBody );
          console.log("Authenticated => ")
          console.log(response); 
          if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
          }
          return (response as any).data.status; 
        } catch (error:any) {
          console.error(`Error calling API: ${error.message}`);
          throw error;
        }
      }
    }
