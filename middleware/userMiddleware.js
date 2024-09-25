const UserService= require("../services/user.services")
const UserServiceInstance = new UserService()
const fetchUsernameInCollection=async(req,res,next)=>{
 try {
    const {username}= req.body
    const user= await UserServiceInstance.findByUsername(username)
    if (!user)
        return res.status(404).json({ message: "User not found!", username });
      else {
        req.user = user;
        next();
      }
 } catch (error) {
   res.status(500).json({message:"could not find user"}) 
 }
}

const fetchUserIdInCollection=async(req,res,next)=>{
 try {
    const user= await UserServiceInstance.findById(req.user.userId)
    if (!user)
        return res.status(404).json({ message: "User not found!", username });
      else {

        req.user = user;
        next();
      }
 } catch (error) {
   res.status(500).json({message:"could not find user"}) 
 }
}
module.exports = {fetchUsernameInCollection,fetchUserIdInCollection}