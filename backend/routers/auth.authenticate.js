const express=require("express");
const User=require("../models/user");
const router=express.Router();
const{v4:uuidv4}=require("uuid");
const jwt=require("jsonwebtoken");
const User = require("../models/user");
const secretKey="My secret key 1234.";
const options={
    expressIn:"1d"
};
router.post("/register",async(reg,res)=>{
    try{
        const User=new User(req.body);
        user._id=uuidv4();
        user.createDate= new Date();
        await User.save();
        const token=jwt.sign({},secretKey.options);
        let model={token:token,user:user};
        res.json(model);
    }
    catch(error)
    {
       res.status(500).json({message:error.message});
    }
});