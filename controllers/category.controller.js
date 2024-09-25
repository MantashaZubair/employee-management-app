const CategoryService = require("../services/category.services")
const CategoryServiceInstance= new CategoryService()
// const { default: slugify } = require('slugify')

const createCategory=async(req,res)=>{
    try {
        const {department}= req.body
        const create = await CategoryServiceInstance.createCategory({department}) 
        res.status(201).json(create) 
    } catch (error) { 
        if(error.code===11000)
            return res.status(404).json({message:"department is already exist"})
        res.status(500).json({message:"internal server error"}) 
    }
  
}
const getAllCategory=async(req,res)=>{
try {
   const getCategory= await CategoryServiceInstance.findcategory()
   res.status(200).json(getCategory) 
} catch (error) {
  console.log(error)
  res.status(500).json({message:"internal server error"})  
}
}


const getSingleCategory=async(req,res)=>{
    try {
       const getsingle= await CategoryServiceInstance.getcategorybyId(req.params.id)
       if(getsingle===null)
        return res.status(404).json({message:"Could not find a blog with the given id"})
       res.status(200).json({getsingle})  
    } catch (error) {
        if(error.message.includes("Cast to ObjectId failed"))
            return res.status(404).json({message:"invalid id"})
          res.status(500).json({message:"oops something wents wrong"}) 
    }
}


const deleteCategory=async(req,res)=>{
try {
  const getById= await CategoryServiceInstance.getcategorybyId(req.params.id)
  if(getById===null)
    return res.status(400).json({message:"could not find blog with given id"})
  await CategoryServiceInstance.deleteCategorybyId(req.params.id) 
  res.status(200).json({message:"delete category "})  
} catch (error) {
    if(error.message.includes("Cast to ObjectId failed"))
        return res.status(404).send("invalid id")
    res.status(500).send("oops something went wrong")   
}
}

const updateCategory=async(req,res)=>{
    try {
        
         const getById= await CategoryServiceInstance.getcategorybyId(req.params.id)
         if(getById===null)
           return res.status(400).json({message:"could not find blog with given id"});
        console.log(req.params.id)
    const update= await CategoryServiceInstance.updatebyId(req.params.id,req.body)
    console.log(update)
    res.status(200).json(update)    
    } catch (error) {
        res.status(500).send("oops something went wrong")    
    }
}


module.exports={createCategory,getAllCategory,getSingleCategory,deleteCategory,updateCategory}