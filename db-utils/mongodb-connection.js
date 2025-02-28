import { MongoClient } from "mongodb";
import dotenv from 'dotenv';


dotenv.config();

const dbCluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;
const dbUserName = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(cloudUri);
const db = client.db(dbName);

const connectToMongoDb = async () =>{
    try {
        await client.connect();
        console.log("MongoDB connected successfully");
    } catch (error) {
       console.log("Connection Failed" , error);
       process.exit(1);   
    }
};

export { db };

export default connectToMongoDb;

