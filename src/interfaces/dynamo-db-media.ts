interface Media {
    id: string;
    type: string;
    name: string;
    extension: string;
    url: string;
    contentProviderMetadata: {
      Bucket: string;
    };
    folder: string;
    searchText: string;
    searchTags: string[];
    localPath: string;
    digitizedNoteDocUrl: string;
    digitizedNoteDocLocal: string;
  }
  
  export default interface DynamoDBMedia {
    media: Media[];
  }
  