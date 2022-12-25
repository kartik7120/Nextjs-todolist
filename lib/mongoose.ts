import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connectDB = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(`mongodb://127.0.0.1:27017/todoList`);
    return handler(req, res);
};

export default connectDB;
