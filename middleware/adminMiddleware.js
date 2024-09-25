const verifyAdmin=async(req,res,next)=>{
try {
    const {isAdmin}=req.user
   if(!isAdmin) return res.status(401).json("admin is not access")
    res.user=isAdmin
    next()
} catch (error) {
  console.log(error)     
}
}

module.exports=verifyAdmin
