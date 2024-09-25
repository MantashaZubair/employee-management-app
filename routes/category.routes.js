const express= require("express")
const router = express.Router()
const {createCategory, getAllCategory, deleteCategory, getSingleCategory, updateCategory}= require("../controllers/category.controller")
const verifyauthJwttoken = require("../middleware/authMiddleware")
const verifyAdmin = require("../middleware/adminMiddleware")
const { fetchUserIdInCollection } = require("../middleware/userMiddleware")

router.post("/create-category",verifyauthJwttoken,fetchUserIdInCollection,verifyAdmin, createCategory)
router.get("/get-category", getAllCategory)
router.get("/getsinglecategory/:id", getSingleCategory)
router.delete("/delete-category/:id", deleteCategory)
router.put("/update-category/:id",verifyauthJwttoken,fetchUserIdInCollection,verifyAdmin, updateCategory)


module.exports= router