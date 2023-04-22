interface DocumentMetadata {
    Pages: number;
  }
  
  interface BoundingBox {
    Width: number;
    Height: number;
    Left: number;
    Top: number;
  }
  
  interface Polygon {
    X: number;
    Y: number;
  }
  
  interface Geometry {
    BoundingBox: BoundingBox;
    Polygon: Polygon[];
  }
  
  interface Relationship {
    Type: string;
    Ids: string[];
  }
  
  interface Block {
    BlockType: string;
    Geometry: Geometry;
    Id: string;
    Relationships?: Relationship[];
    Confidence?: number;
    Text?: string;
  }
  
  interface ResponseBody {
    DocumentMetadata: DocumentMetadata;
    Blocks: Block[];
  }
 
  export default interface TextractResponse {
    statusCode: number;
    body: ResponseBody;
  }
  