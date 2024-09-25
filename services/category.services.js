const categoryModel = require("../models/category.model")
class CategoryService{
   createCategory =async(body)=>{
      console.log(body)
    try {
       const newcreateCategory=new categoryModel(body)
       const result= await newcreateCategory.save()  
       return result
    } catch (error) {
     throw error
    }
   }
   findcategory=async()=>{
    try {
       const getcategory= await categoryModel.find()
    return getcategory
    } catch (error) {
       throw error 
    }
   }

   getcategorybyId=async(id)=>{
     try {
       const findById = await categoryModel.findById(id)
       return findById  
    } catch (error) {
       throw error
    }
   }

   updatebyId=async(id,body)=>{
      try {
        console.log(id,body)
       const result = await categoryModel.findByIdAndUpdate({_id:id},body,{new:true})  
       return result  
    } catch (error) {
        throw error
      }
   }

   deleteCategorybyId=async(id)=>{
    try {
    const deletecategory= await categoryModel.findByIdAndDelete(id)
    return deletecategory 
    } catch (error) {
       throw error  
    }
   }
}


module.exports= CategoryService