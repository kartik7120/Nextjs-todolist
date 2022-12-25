import mongoose from "mongoose";

interface ListInterface {
    title: String,
    items?: any[],
    description?: string
}

const ListSchema = new mongoose.Schema<ListInterface>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "No description for the list"
    }
})

export default mongoose.models.List || mongoose.model('List', ListSchema);