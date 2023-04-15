import http from "./init";

export default class ApiService {
    async getTest() { 
       const resp = await http.get("/getTest");
       return resp.data;
    }
}
