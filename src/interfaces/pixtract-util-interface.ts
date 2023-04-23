export default interface IPixUtils{

    getUniqueName(name:string):string ;

    getNewUUID():string;

    getBase64Image(img:any):string;
}