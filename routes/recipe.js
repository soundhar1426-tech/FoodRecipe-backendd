const express=require("express")
const {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}=require("../controller/recipe")
const router=express.Router()
const verifyToken=require("../middleware/auth")

router.get("/",getRecipes) //Get all recipes
router.get("/:id",getRecipe)// Get a single recipe
router.post("/",upload.single('file'),verifyToken,addRecipe)// add a recipe
router.put("/:id",upload.single('file'),editRecipe) // edit a recipe
router.delete("/:id",deleteRecipe)// delete a recipe
module.exports=router