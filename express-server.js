
import express from 'express';
import connectToDb from './db-utils/mongoose-connection.js';
import cors from 'cors';
import loginRouter from './routes/auth/login.js';
import registerRouter from './routes/auth/register.js';
import connectToMongoDb from './db-utils/mongodb-connection.js';

const server = express();
const port  = 8000;

await connectToDb();
await connectToMongoDb();


server.use(express.json());
server.use(cors());




server.use('/login', loginRouter);
server.use('/register', registerRouter);

server.listen(port, ()=>{
    console.log("Port Listening on " , port)
});