const mongoose= require('mongoose')

const CategorySchema= new mongoose.Schema({
    department:{
        type:String,
        require:true,
        unique:true
    },
   
})

const categoryModel= mongoose.model("caterogy", CategorySchema)
module.exports= categoryModel;