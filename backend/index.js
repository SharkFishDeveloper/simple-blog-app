import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import DB_URL from "./DB_URL.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import { BlogCategory } from "./util/ENUMS.js";


const app = express();

app.use(cors());
app.use(express.json())


mongoose.connect(DB_URL).then(()=>console.log("MONGODB connected")).catch(()=>console.error("Mongodb connection error"))


//*------------------------------------------------------

app.get("/",(req,res)=>{
    return res.json({message:"This is / route"});
})


app.use("/user",userRouter);
app.use("/blog",blogRouter);



//* just listening on port 3000
app.listen(3000,()=>console.log(`Server running on ${3000}`))
 //This is kaif writing
  //This is kaif 2nd writing