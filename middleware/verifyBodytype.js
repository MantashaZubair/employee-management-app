const verifyBodytype=(req,res)=>{
if(req.headers["content-type"]!== "application/json")
    return res.status(415).send("please send jSON placeholder")
next()
}

module.exports= verifyBodytype