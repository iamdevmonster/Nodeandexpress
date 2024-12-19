const express=require("express");
const validiateToken=require("../middleware/validiateTokenHandler");
const {
   registerUser,
    loginUser,
    currentUser
}=require("../controllers/usercontroller");
const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser) 
router.get("/current",validiateToken,currentUser) 
module.exports=router;