const AuthService = require("../services/auth.services")
const AuthServiceInstance=new AuthService()

const verifyauthJwttoken=async(req,res,next)=>{
const token=req.headers.authorization.split(" ")[1]
if(!token)
    return res.status(401).json("token is not access")
try {
    const decode= await AuthServiceInstance.verifyauthJwttoken(token) 
    req.user=decode
    next()   
} catch (error) {
    if (error.message === "jwt expired") return res.sendStatus(401);
    return res.sendStatus(500); 
}
  
}
module.exports=verifyauthJwttoken