import jwt from "jsonwebtoken";
import JWT_SECRET from "../util/SECURITY.js";

const authMiddlware = async(req,res,next)=>{
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Please login !!" }).status(303);
        }

        const decodedToken = jwt.verify(token,JWT_SECRET);
        req.userId = decodedToken.userId; //* add userId property to req 

        next();
    } catch (error) {
        return res.json({message:"Please try after some time !!"}).status(300);
    }
}

const readBlogAuthMiddleware = async (req, res,next) => {
    try {
        const token = req.header("Authorization"); // should be same as login token
        if(!token){
            return res.status(401).json({ message: "Please login !!" }).status(303);
        }
        next();

    } catch (error) {
        return res.json({message:"Please try after some time, some error occured !!"}).status(300);
    }
}

export { authMiddlware, readBlogAuthMiddleware };