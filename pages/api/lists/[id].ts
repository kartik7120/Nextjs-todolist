import { NextApiRequest, NextApiResponse } from "next";
import List from "../../../models/List";
import Item from "../../../models/ListItem";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const lists = await List.find({ _id: id }).populate("items").exec();
            return res.status(200).json(lists);
        } catch (error) {
            return res.status(500).json("Some errors occured while retreving of items of list");
        }
    }

    if (req.method === "POST") {
        try {
            const { title, description } = req.body;
            console.log(`title = ${title} and description = ${description}`);
            const item = new Item({
                title,
                description,
            });

            console.log(item);

            await item.save();

            const lists = await List.findByIdAndUpdate(id, {
                $push: { items: item._id }
            }, { new: true });

            return res.status(200).json(lists);

        } catch (error) {
            return res.status(500).json("Error occured while creating a todo item");
        }
    }

    if (req.method === "DELETE") {
        try {
            const { itemId } = req.body;
            const lists = await List.findByIdAndUpdate(id, {
                $pull: {
                    items: itemId
                }
            }, { new: true }).populate("items");

            await Item.findByIdAndDelete(itemId);

            return res.status(200).json(lists);
        } catch (error) {
            return res.status(500).json("Error occured while deleting a todo item");
        }
    }
}
export default handler;