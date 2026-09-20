const Recipes=require("../models/recipe")
const multer  = require('multer')



//this code taken from multer documentation: https://www.npmjs.com/package/multer
//this code is used to handle file uploads in a Node.js application using the multer middleware. It defines how and where uploaded files should be stored on the server.
//where should the image be saved
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  //how the image should be named
  //Date.now=>creates a value based on the current time,helping makes filenames different.
  filename: function (req, file, cb) {
      const filename=Date.now() + '-' + file.fieldname
      cb(null,filename)
    }
  })

const upload = multer({ storage: storage })


const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find()
    return res.json(recipes)
}

const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    return res.json(recipe)
}

const addRecipe=async(req,res)=>{
    console.log(req.user)
    const {title,ingredients,instructions,time}=req.body
    if(!title || !ingredients || !instructions){
        return res.json({message:"Please fill all the required fields"})
    }
    const newRecipe=await Recipes.create({
        title,ingredients,instructions,time,coverImage:req.file.filename,createdBy:req.user.id})
        return res.json(newRecipe)
}

const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body
    const recipe=await Recipes.findById(req.params.id)
    try{
        if(recipe){
        await Recipes.findByIdAndUpdate(req.params.id,{...req.body,...(req.file && { coverImage: req.file.filename })},{new:true})
        res.json({title,ingredients,instructions,time})
    }
    }
    catch(err){
        return res.status(404).json({message:"Recipe not found"})
    }
    
}

const deleteRecipe=async(req,res)=>{
    try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(404).json({message:"Recipe not found"})
    }
    
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}