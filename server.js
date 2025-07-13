// console.log("hello")


require("dotenv").config()
const express=require("express");
const app=express();

const db= require("./config/db")


const path= require("path")


app.set("view engine", "ejs");
app.set("views", "views")


app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({extended:true}))

app.use(require("./routes/app.routes"))
app.listen(process.env.port, async()=>{
    await db.connectDb()
    console.log(`server is running on port` + process.env.port)
})