const express=require("express");
const User=require("../models/User");
const authMiddleware=require("../middleware/authMiddleware");
const router=express.Router();
router.get("/dashboard",authMiddleware,async(req,res)=>{
    try{
        const user=await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        res.json({
            name:user.name,
            email:user.email,
            role:user.role,
            kycStatus:user.kycStatus
        });
    } catch(err){
        res.status(500).json({error:"Server error"});
    }
});
module.exports=router;