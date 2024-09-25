const AuthService=require("../services/auth.services")
const AuthServiceInstance = new AuthService()
const register=async(req,res)=>{
    try {
        console.log(req.body)
        const response= await AuthServiceInstance.register(req.body) 
        res.status(201).send(response);
    } catch (error) {
        if (error.code === 11000)
            return res.status(400).send({
              message: `${
                Object.keys(error.keyPattern)[0]
              } already exists. Please login!`,
            });
          res
            .status(500)
            .send({ message: "Oops! Something went wrong. Please try again!" });
        }  
     
}


const login=async(req,res)=>{
    try {
      console.log(req.user)
     const response= await AuthServiceInstance.login(req.body.password,req.user)
     console.log(response) 
     if(response.isLoggedin){
        return (
            res.status(200).cookie("access_token",response.token,{
                maxAge:3600000,
                httpOnly:true
            }).json({message:"loginSuccessfull",token:response.token, username:req.user})
        )
     }
     res.status(404).send({message:"password is incorrect"})   
    } catch (error) {
        if (error.message.includes("not found"))
            return res.status(404).send({ message: "Username could not be found" });
          res
            .status(500)
            .send({ message: "Oops! Something went wrong. Please try again!" }); 
    }
}


module.exports={register,login}