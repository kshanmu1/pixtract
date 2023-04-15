import PixMedia from "@/models/pixmedia";

export default interface IMediaController {
    getAllMedia(): PixMedia[];
    getMediaById(id: string): PixMedia;
    addMedia(localPath: string, name: string): boolean;
    addNote(localPath: string, name: string): boolean;
    getAllFolders(): string[];
    getMediaForFolder(folderName: string): PixMedia[];
}