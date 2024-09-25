import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: "string",
        required : true,
    },
    email : {
        type: "string",
        required : true,
    },
    password : {
        type: "string",
        required: true,
    },
    name : {
        type: "string",
        required: true,
    },
    role : {
        type: "string",
        required :true,
    }
});

const userModel = new mongoose.model("user", userSchema, "users");

export { userModel };