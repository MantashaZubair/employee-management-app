const mongoose= require("mongoose")

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    username: {
        type: String,
        unique: true,
        required: true,
      },
 password: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        require:true,  
    },
    phone:{
        type:Number,
        require:true
    },
    salary:{
        type:String
    },
    dob:{
        type:Date
     },
     location:{
        type:String
     },
    isAdmin:{
        type:Boolean,
        default:false
    } 
},{timestamps:true})
const userModel=mongoose.model("mantasha", UserSchema)

module.exports= userModel