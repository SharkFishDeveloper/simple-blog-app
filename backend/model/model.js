import mongoose from "mongoose";
import { BlogCategory } from "../util/ENUMS.js";

const userSchema = new mongoose.Schema({
    name : {type:String , required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})


const blogSchema = new mongoose.Schema({
    title : {type:String , required: true, unique: true },
    desc: { type: String, required: true},
    authorName: { type: String, required: true },
    authorId:{ type: mongoose.Schema.ObjectId, required: true},
    createdAt: { type: Date, default: Date.now },
    category:{
        type:String,
        enum:["Technology","Health","News","General"],
        default:"General"
    }
})




const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

export {User,Blog};