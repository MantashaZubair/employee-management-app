const express= require("express")
const router= express.Router()
const {register,login}= require("../controllers/auth.controller")
const { validateSchema } = require("../middleware/validatemiddleware")
const {fetchUsernameInCollection}= require("../middleware/userMiddleware")
const  {registerValidationSchema,loginBodyValidationSchema}  = require("../validation/authValidation")
const validateRegisterUser=validateSchema(registerValidationSchema)
const validateLoginUser= validateSchema(loginBodyValidationSchema)


router.post("/register",validateRegisterUser, register )
router.post("/login",validateLoginUser,fetchUsernameInCollection, login )


module.exports=router