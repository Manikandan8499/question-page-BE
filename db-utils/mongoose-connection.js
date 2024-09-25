
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbCluster = process.env.DB_CLUSTER || "";
const dbName = process.env.DB_NAME || "";
const dbUserName = process.env.DB_USER || "" ;
const dbPassword = process.env.DB_PASSWORD || "";

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDb = async () => {
try {
    await mongoose.connect(cloudUri);
    console.log("DB connected successfully");
} catch (error) {
    console.log("Connection failed", error);
    process.exit(1);
}
};

export default connectToDb;