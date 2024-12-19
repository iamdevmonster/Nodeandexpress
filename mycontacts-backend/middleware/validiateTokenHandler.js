const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validiateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    //then i have to extract the token from the authHeader
    if(authHeader && authHeader.startsWith("Bearer ")){
        token=authHeader.split(" ")[1];
        //verufying the token and
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,decoded)=>{
            if(error){
                res.status(401);
                throw new Error("Not authorized,token failed")
            }
             else{
                req.user=decoded.user;//i have extraced the user from the token and i have stored it in the req.user
                next();
            } 
          
        })
        if(!token){
            res.status(401);
            throw new Error("Not authorized,token failed")
        }
    }
})
module.exports=validiateToken;