import mongoose from "mongoose";
import { ConfigParams } from ".";

export const DBConn = // Establish a connection to MongoDB
mongoose.connect(ConfigParams.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

