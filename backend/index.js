import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import DB_URL from "./DB_URL.js";
import {z} from "zod"
import User from "./model/model.js";
import axios from "axios";


const app = express();

app.use(cors());
app.use(express.json())


mongoose.connect(DB_URL).then(()=>console.log("MONGODB connected")).catch(()=>console.error("Mongodb connection error"))


const userZod = z.object({
    name: z.string().min(6, "Name is too short").max(10,"Name is too long"), 
    email: z.string().email("Invalid email address"), 
    password: z.string().min(6, "Password must be at least 6 characters long")
    .max(8,"Password is too long")
});

//*------------------------------------------------------

app.get("/",(req,res)=>{
    return res.json({message:"This is / route"});
})



app.post("/signup",async (req,res)=>{
    const {name,email,password} = req.body;
    const result = userZod.safeParse({name,email,password});
    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors.map((i)=>
        {
            return res.json({message:i.message})
        }
        )});
    }
    //* just creating a new user
    const newUser  =  new User({
        name,
        email,
        password
    })
    try {
        newUser.save();
        console.log("NEW USER CREATED");
    } catch (error) {
        console.log("ERROR->",error);
        
    }

    return res.json({message:"SUCCESS",username:name,email,password,createdAt:Date.now()});
})


app.get("/json",async(req,res)=>{
    const result  = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.json({response:result.data});
})

//* just listening on port 3000
app.listen(3000,()=>console.log(`Server running on ${3000}`))
