const express= require("express")
const {  getUser,getUsername,deleteUser,getUserById,searchUser, updateUser } = require("../controllers/user.controller")
const { validateSchema } = require("../middleware/validatemiddleware")
const {userUpdateValidationSchema} = require("../validation/userValidation")
const verifyauthJwttoken = require("../middleware/authMiddleware")
const verifyAdmin = require("../middleware/adminMiddleware")
const { fetchUserIdInCollection } = require("../middleware/userMiddleware")
const { cloudinaryFileUploader } = require("../middleware/FileUploader")
const router= express.Router()
const validateUpdateUser=validateSchema(userUpdateValidationSchema)
router.get("/",verifyauthJwttoken,fetchUserIdInCollection,verifyAdmin,getUser)
router.get("/search",searchUser)
router.get('/admin-auth', verifyauthJwttoken ,fetchUserIdInCollection,verifyAdmin, (req,res)=>{
    try {
        res.status(200).send({ok:true})  
    } catch (error) {
     console.log(error)   
    }
   
})

router.get('/user-auth',verifyauthJwttoken , (req,res)=>{
    res.status(200).send({ok:true})
})
//protected  admin route auth

router.get("/:id",getUserById)
router.get("/:username",getUsername)
// router.post("/",validateUser,createUser)
router.put("/:id",cloudinaryFileUploader.single('profileImage'),validateUpdateUser,verifyauthJwttoken,updateUser)
router.delete("/:id",deleteUser)

module.exports= router