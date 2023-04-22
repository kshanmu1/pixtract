import INoteController from "@/interfaces/note-controller-interface";
import PixMedia from "@/models/pixmedia";
import DynamoDBService from "../services/dynamodb-service"

//KG
export default class NoteController implements INoteController{
    getAllNotes(): PixMedia[] {
        const notes = DynamoDBService.getAllRowsMediaMaster();
        throw new Error("Method not implemented.");
    }
    getNoteById(id: string): PixMedia {
        const note = DynamoDBService.getAllRowsMediaMasterById(id);
        throw new Error("Method not implemented.");
    }
    getNoteDocument(id: string): string {
        throw new Error("Method not implemented.");
    }
    
}