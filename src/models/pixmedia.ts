import PixUtils from "../services/pixtract-utils"
import { MediaType } from "@/interfaces/media-type";

    
   export default class PixMedia {
    
    id: string;
    
    type: MediaType;
    
    name: string;
    
    extension: string;
    
    url: string;
    
    contentProviderMetadata: { Bucket: string };
    
    folder: string;
    
    searchText: string;
    
    searchTags: string[];
    
    localPath: string;
    
    digitizedNoteDocUrl: string;
    
    digitizedNoteDocLocal: string;
    
    constructor(
    
    type: MediaType,
    
    name: string,
    
    extension: string,
    
    url: string,
    
    contentProviderMetadata: { Bucket: string },
    
    folder:string | undefined,
    
    searchText: string,
    
    searchTags: string[],
    
    localPath: string,
    
    digitizedNoteDocUrl: string,
    
    digitizedNoteDocLocal: string
    
    ) {
    
    this.id  = PixUtils.getNewUUID()
    
    this.type = type;
    
    this.name = PixUtils.getUniqueName(name);
    
    this.extension = extension;
    
    this.url = url;
    
    this.contentProviderMetadata = contentProviderMetadata;
    
    this.folder = folder??"Default";
    
    this.searchText = searchText;
    
    this.searchTags = searchTags;
    
    this.localPath = localPath;
    
    this.digitizedNoteDocUrl = digitizedNoteDocUrl;
    
    this.digitizedNoteDocLocal = digitizedNoteDocLocal;
    
    }
    
    }