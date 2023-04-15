import IApi from "@/interfaces/api_interface"
export default class Api implements IApi {
    uri: string;
    request: object;
    response: object;
    type: string;
 
    constructor(uri:string, req:object, resp:object, type:string)
    {
        this.uri = uri;
        this.request = req;
        this.response = resp;
        this.type = type;
    }
}