import { gettokenfromrequset } from "../utils/reqheader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const islogedin=(req,res,next)=>{
    const token = gettokenfromrequset(req);
    const decodedUser=verifyToken(token);
    if(!decodedUser){
        throw new Error('invalid from the midlware..token expired ');
    }else{
        req.userAuthId=decodedUser?.id
        next()
    }
}