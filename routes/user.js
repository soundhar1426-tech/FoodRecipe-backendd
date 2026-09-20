const express=require("express")
const router=express.Router()
const {userSignUp,userLogin,getUser}=require("../controller/user")


router.post("/signUp",userSignUp) // user sign up
router.post("/login",userLogin) // user login
router.get("/user/:id",getUser) // get user by id

module.exports=router