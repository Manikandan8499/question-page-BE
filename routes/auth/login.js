import express from "express";
import { userModel } from "../../db-utils/models.js";
import { db } from "../../db-utils/mongodb-connection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

const loginRouter = express.Router();
dotenv.config();

loginRouter.post("/", async (req, res)=>{
    const {email, password} = req.body;

    const userObj = await userModel.findOne({ email });
    if(userObj){
        bcrypt.compare(password, userObj.password, async (err, result) =>{
            if(err) {
                res.status(500).send({message : "Something went wrong"});
            }else{
                 if(result){
                    const collection = db.collection("users");
                    const user = await collection.findOne({email}, {projection : {password : 0, __v : 0, _id : 0}});
                    // const user = await userModel.findOne({email}, {password : 0, __v : 0, _id : 0});
                    
                      var token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn : "1day", });
                    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                    // console.log(token);

                    res.status(200).send({msg: "User successfully logged In" , code : 1, token})
                 }else{
                    res.status(400).send({msg: "User credential failed", code : 0})
                 }
            }
        })

        //res.status(200).send({message : "user log in "});
    }else {
        res.status(404).send({message : "user not found"});
    }
   
    console.log({email, password});
});

export default loginRouter;
