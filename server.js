const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDb")
const cors=require("cors")
const PORT =process.env.PORT || 3000
connectDb()
app.use(express.json())
app.use(cors())
//it tells express ,make files inside the public folder accesssible through the browser. For example, if you have an image file named "image.jpg" inside the public folder, you can access it in the browser using the URL http://localhost:5000/image.jpg.
app.use(express.static("public"))
app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})