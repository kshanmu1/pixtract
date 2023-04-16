interface BoundingBox {
    Width: number;
    Height: number;
    Left: number;
    Top: number;
  }
  
  interface Label {
    Name: string;
    Confidence: number;
    Instances: {
      BoundingBox: BoundingBox;
      Confidence: number;
    }[];
    Parents: {
      Name: string;
    }[];
    Aliases: {
      Name: string;
    }[];
    Categories: {
      Name: string;
    }[];
  }
  
  interface ResponseBody {
    Labels: Label[];
  }
  
  export default interface ImageRekognitionResponse {
    statusCode: number;
    body: ResponseBody;
  }