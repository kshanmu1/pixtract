import INoteController from "@/interfaces/note-controller-interface";
import PixMedia from "@/models/pixmedia";

export default class NoteController implements INoteController{
    getAllNotes(): PixMedia[] {
        throw new Error("Method not implemented.");
    }
    getNoteById(id: string): PixMedia {
        throw new Error("Method not implemented.");
    }
    getNoteDocument(id: string): string {
        throw new Error("Method not implemented.");
    }
    
}