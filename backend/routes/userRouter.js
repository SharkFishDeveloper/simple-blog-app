import express from "express";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../util/SECURITY.js";
import {z} from "zod"
import User from "../model/model.js";
import axios from "axios";


const userZod = z.object({
    name: z.string().min(6, "Name is too short").max(10,"Name is too long"), 
    email: z.string().email("Invalid email address"), 
    password: z.string().min(6, "Password must be at least 6 characters long")
    .max(8,"Password is too long")
});



const userRouter = express.Router();


userRouter.post("/signup",async(req,res)=>{
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
        const id = newUser._id.toString();
        const token = jwt.sign({id},JWT_SECRET);
        console.log("YOUR TOKEN is -> ",token);
        newUser.save();
        console.log("NEW USER CREATED");
        //jwt be -> fe -> save in cookies
    
    } catch (error) {
        console.log("ERROR->",error);
        
    }

    return res.json({message:"SUCCESS",username:name,email,password,createdAt:Date.now()});
})

userRouter.get("/decode",(req,res)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGM2YWI0ZTJkMzE3MDhjMDhkNjI3OSIsImlhdCI6MTcyNTcyMTI2OH0.87_A4mxoORMSFmlgD6UICrg3Dby7im8eX_yTW2tnapA";
    const userIdDecoded = jwt.verify(token,JWT_SECRET)
    return res.json({"message":userIdDecoded})
})

export default userRouter;
