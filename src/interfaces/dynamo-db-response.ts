  interface ResponseBody {
    searchTags: string[];
    folder: string;
    url: string;
    name: string;
    digitizedNoteDocUrl: string;
    extension: string;
    contentProviderMetadata: {
      Bucket: string;
    };
    digitizedNoteDocLocal: string;
    id: string;
    searchText: string;
    localPath: string;
    type: string;
  }
  
  export default interface DynamoDBResponse {
    statusCode: number;
    body: ResponseBody[];
  }
  