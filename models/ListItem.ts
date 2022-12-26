import mongoose from "mongoose";

export interface ListItem {
    title: string,
    checked: boolean,
    description: string,
    _id: string
}

const listItem = new mongoose.Schema<ListItem>({
    title: {
        type: String,
        required: true,
        default: "Untitled"
    },
    checked: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ""
    }
})

export default mongoose.models.Item || mongoose.model("Item", listItem);