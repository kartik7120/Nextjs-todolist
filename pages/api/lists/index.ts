import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongoose";
import List from "../../../models/List";

interface CreateList {
    title: string,
    description?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const lists = await List.find({});
            return res.status(200).send(lists);
        } catch (error) {
            return res.status(500).end(error);
        }
    }

    if (req.method === "POST") {
        try {
            const { title, description } = req.body;

            if (title === null || title === undefined) {
                return res.status(400).json("Please provide the title of the list");
            }

            const newList = new List({
                title,
                description
            })

            await newList.save();

            return res.status(200).json("List Created Successfully");
        } catch (error) {
            return res.status(500).json("Error occured while creating a list , please try again");
        }
    }

    if (req.method === "DELETE") {
        try {

            const { id } = req.body;

            if (id === null || id === undefined) {
                return res.status(400).json("Please provide the id of the list");
            }

            const lists = await List.findByIdAndDelete(id, {
                new: true
            });

            return res.status(200).json(lists);

        } catch (error) {
           return res.status(500).json("Error occured while deleting the lists");
        }
    }
}

export default connectDB(handler);