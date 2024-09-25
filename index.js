const express = require("express")
const connectDB = require("./config/db")
const dotenv= require("dotenv")
const cors= require("cors")
const path = require('path')
dotenv.config()
const userRoutes= require("./routes/user.routes")
const authRoutes= require("./routes/auth.routes")
const categoryRoutes= require("./routes/category.routes")
const app = express()
connectDB()
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path.join(__dirname, "./client/dist")))

 app.use("/api/v8/user", userRoutes)
 app.use("/api/v8/auth", authRoutes)
 app.use("/api/v8/category", categoryRoutes)

 //rest api
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})
app.listen(process.env.PORT, ()=>{
    console.log(`server run at port ${process.env.PORT}`)
})
