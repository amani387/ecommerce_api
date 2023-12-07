import jwt  from "jsonwebtoken";
const generatetoken =(id)=>{
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:"7d"});
};

export default generatetoken;