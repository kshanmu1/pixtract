import PixMedia from "@/models/pixmedia";

export default interface IMediaController {
    getAllMedia(): Promise<PixMedia[]>;
    getMediaById(id: string): PixMedia;
    addMedia(localPath: string, name: string): boolean;
    getAllFolders(): string[];
    getMediaForFolder(folderName: string): PixMedia[];
}