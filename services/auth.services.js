const bcrypt = require("bcrypt")
const userModel= require("../models/user.model")
const jwt= require("jsonwebtoken")
class AuthService{
    register=async(body)=>{
      const hashedPassword= await this.hashPassword(body.password)
     const newUser=  new userModel({...body, password:hashedPassword})
      await newUser.save()
      return newUser
    }
  
    hashPassword=async(password)=>{
      const salt= await bcrypt.genSalt();
      const hashedPassword= await bcrypt.hash(password,salt)
      return hashedPassword
    }


   verifyPassword=async(password,hashedPassword)=>{
      return await bcrypt.compare(password,hashedPassword)
    }

    login=async(password,reqUser)=>{
      console.log(await this.verifyPassword(password,reqUser.password))
         if(await this.verifyPassword(password,reqUser.password)){
          return {
            isLoggedin:true,
            token: await this.generateToken({userId: reqUser._id})
          }
         }
         return {
         isLoggedin: false,
         }
    }
    generateToken=async(payload)=>{
       const token= await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1hr"});
       return token;
    }

    verifyauthJwttoken=async(token)=> jwt.verify(token,process.env.JWT_SECRET) 
}

module.exports=AuthService