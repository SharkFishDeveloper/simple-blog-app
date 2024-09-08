import jwt from "jsonwebtoken";
import JWT_SECRET from "../util/SECURITY.js";

const authMiddlware = async(req,res,next)=>{
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Please login !!" }).status(303);
        }

        const userId = jwt.verify(token,JWT_SECRET);
        req.userId = userId.userId; //* add userId property to req 

        next();
    } catch (error) {
        return res.json({message:"Please try after some time !!"}).status(300);
    }
}

export default authMiddlware