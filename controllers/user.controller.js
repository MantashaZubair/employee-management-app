const userModel = require("../models/user.model")
const UserService= require("../services/user.services")
const UserServiceInstance = new UserService()
const getUser=async(req,res)=>{
  try {
    const user = await UserServiceInstance.findAllUser() 
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"oops something wents wrong"})
  }
}

// const findByUserId=(id)=>{
//    return 
// }

const getUserById=async(req,res)=>{
try {
  const user= await UserServiceInstance.findById(req.params.id)
  if(user===null)
    return res.status(404).json({message:"Could not find a blog with the given id"})
  res.status(200).json(user)
} catch (error) {
  console.log(error)
  if(error.message.includes("Cast to ObjectId failed"))
    return res.status(404).json({message:"invalid id"})
  res.status(500).json({message:"oops something wents wrong"})
}
}
const getUsername=async(req,res)=>{
try {
  const user= await UserServiceInstance.findById(req.body.username)
  if(user===null)
    return res.status(404).json({message:"Could not find a blog with the given id"})
  res.status(200).json(user)
} catch (error) {
  if(error.message.includes("Cast to ObjectId failed"))
    return res.status(404).json({message:"invalid username"})
  res.status(500).json({message:"oops something wents wrong"})
}
}




const createUser= async(req,res)=>{
  console.log(req.body)
try {
  const user= await UserServiceInstance.createUser(req.body) 
  console.log(user)
  res.status(201).json(user)
} catch (error) {
    console.log(error)
    if(error.code===11000) 
        return res.status(400).json({message:"email must be unique"})
 res.status(500).json({message:"oops something wents wrong"})
}
}



const deleteUser = async(req,res) =>{
try {
  const getbyid= await UserServiceInstance.findById(req.params.id)
  if(getbyid===null) 
    return res.status(400).json({message:"could not find blog with given id"})
  await UserServiceInstance.deleteById(req.params.id) 
  res.status(204).json({message:"delete user"})
} catch (error) {
  console.log(error) 
  if(error.message.includes("Cast to ObjectId failed"))
      return res.status(404).send("invalid id")
  res.status(500).send("oops something went wrong")    
}

}





const updateUser=async(req,res)=>{
  try {
    const getbyid= await UserServiceInstance.findById(req.params.id)
    if(getbyid===null) 
      return res.status(400).json({message:"could not find blog with given id"})
    if (req.file) {
      console.log(req.file); // Information about the uploaded file

      // Optionally, update the user with the file information (e.g., profile picture URL)
      req.body.profileImage = req.file.path; // Assuming this is the profile picture
    }
   const update=await UserServiceInstance.updateById(req.params.id,req.body) 
   res.status(201).json(update)
  } catch (error) {
    console.log(error)
    if (error.code === 11000)
      return res.status(400).json({
        message:
          "A blog with this email already exists. Please use a unique email",
      });
    if (error.message.includes("Cast to ObjectId failed"))
      return res.status(404).json({ message: "Invalid id" });
    res
      .status(500)
      .json({ message: "Oops! Something went wrong. Please try again" });
  }
}


const searchUser = async (req, res) => {
  const { username, department } = req.query;
  try {
    const query=[]
    if(username){
      query.push({ username: { $regex: new RegExp(username, "i") } })
    }
    if(department){
    query.push({ department: { $regex: new RegExp(department, "i") } })
    }
        // If neither name nor department is provided, return an empty array
    if (query.length === 0) {
      return res.status(400).json({ message: "Please provide a name or department to search." });
    }

    const user = await userModel.find({
      $or: query
    });
    console.log(user)
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops! Something went wrong. Please try again" });
  }
};   



module.exports={createUser,getUser,getUserById,getUsername,deleteUser,searchUser,updateUser}