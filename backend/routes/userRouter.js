import express from "express";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../util/SECURITY.js";
import {z} from "zod"
import {User} from "../model/model.js";


const userZod = z.object({
    name: z.string().min(6, "Name is too short").max(10,"Name is too long"), 
    email: z.string().email("Invalid email address"), 
    password: z.string().min(6, "Password must be at least 6 characters long")
    .max(8,"Password is too long")
});



const userRouter = express.Router();


userRouter.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body;
    //* parse req.body to check if they are of proper format
    const result = userZod.safeParse({name,email,password});
    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors.map((i)=>
        {
            return res.json({message:i.message}).status(400);
        }
        )});
    }
    //* ----END----
    
    const checkUser = await User.findOne({name,email});
    if(checkUser !== null){ // if checkUser is not null
        return res.json({message:"User already exists"}).status(400);
    }
    
    const newUser  =  new User({
        name,
        email,
        password
    })

    
    try {
        const id = newUser._id.toString();
        //* encyrpt the userId
        const token = jwt.sign({userId:id},JWT_SECRET);
        await newUser.save(); 
        res.cookie("user-token",token);
        return res.json({"message":"Signup success"}).status(200);

    } catch (error) {
    }

    return res.json({message:"SUCCESS",username:name,email,password,createdAt:Date.now()}).status(400);
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const checkUser = await User.findOne({email,password});
    if(checkUser === null){ 
        return res.json({message:"User doesnot exist. PLease signup !!"}).status(400)
    }
    const id = checkUser._id.toString()
    //* key to enter website
    const token = jwt.sign({userId:id},JWT_SECRET);
    //* save cookie in Frontend
    res.cookie("user-token",token);
    return res.json({message:"Log in success !!"}).status(200)
})


export default userRouter;
