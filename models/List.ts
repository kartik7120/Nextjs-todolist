import mongoose, { Mongoose } from "mongoose";
import { ListItem } from "./ListItem";

export interface ListInterface {
    title: string,
    items?: ListItem[],
    description?: string,
    _id: string
}

const ListSchema = new mongoose.Schema<ListInterface>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "No description for the list"
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }]
})

export default mongoose.models.List || mongoose.model('List', ListSchema);