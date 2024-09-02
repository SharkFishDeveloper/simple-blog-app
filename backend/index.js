import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    return res.json({message:"This is / route"});
})

app.post("/create-blog",(req,res)=>{
    let title = "";
    const {a,b,c,title:d} = req.body;
    return res.json({a,b,c,d})
})




app.listen(3000,()=>console.log(`Server running on ${3000}`))
