import PixMedia from "@/models/pixmedia";

export default interface INoteController {
    getAllNotes(): PixMedia[];
    getNoteById(id: string): PixMedia;
    getNoteDocument(id: string): string;
  }