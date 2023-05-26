const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const nodemailer= require("nodemailer");

require('dotenv').config();
const routes = express.Router();
routes.get("/",(req,res)=>{
  res.send({msg:"hello amol"});
})
routes.post("/register",async(req,res)=>{
    let { name, email, pass } = req.body;
  try {
    const user = await UserModel.findOne({email})
    
    // console.log(user.verified);
    // console.log(user);
    // console.log(user.verified=="true");
    if(user){
      if(user.verified=="true") res.send({msg:"already registered"});
      else if(user.verified=="false"){
         const otp = Math.floor(1000 + Math.random() * 9000);
           const transporter = nodemailer.createTransport({
             service: "Gmail",
             auth: {
               user: "amolthakare629@gmail.com",
               pass: "troyjfbubahnqkhc",
             },
           });
   
           const mailOptions = {
             from: "amolthakare629@gmail.com",
             to: email,
             subject: "otp",
             text: "your otp is " + otp,
           };
   
           await transporter.sendMail(mailOptions);
           user.otp = otp;
           await user.save();
           res.send({ msg: "otp has send", email: email });
       }
    }
      
    else{
      bcrypt.hash(pass, 4, async (err, securepass) => {
        if (err) {
          res.send({msg:"Something went wrong"});
        } else {
          let user = new UserModel({ name, email, pass: securepass,verified:false });
          await user.save();
          const savedUser = await user.save();
          const otp = Math.floor(1000 + Math.random() * 9000);
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "amolthakare629@gmail.com",
              pass: "troyjfbubahnqkhc",
            },
          });
  
          const mailOptions = {
            from: "amolthakare629@gmail.com",
            to: email,
            subject: "otp",
            text: "your otp is " + otp,
          };
  
          await transporter.sendMail(mailOptions);
          savedUser.otp = otp;
          await savedUser.save();
          res.send({ msg: "otp has send", email: email });
        }
      });
    }
    
  } catch (error) {
    console.log(error);
    res.send({msg:"Something went wrong"});
  }
})

routes.post("/verify", async (req, res) => {
    const {email,otp} = req.body;

    const user = await UserModel.findOne({email})
    console.log(user);
    if(!user){
        res.send({msg:"Please signup first not a user"});
    }
    const verify_otp = otp;

    if(user.otp==verify_otp){
        user.verified=true;
        await user.save();
        res.send({msg:"otp verified","otp":user.otp});
    }
    else{
        res.send({otp:user.otp});
    }
})

routes.post("/login", async (req, res)=>{
    let {email, pass} = req.body;
    try {
        const user = await UserModel.findOne({email})
        console.log(user);
        const hash_pass = user.pass;
        if(!user){
            res.send("Please Register First");
            
        }else{
            if(user.verified=="true"){
                bcrypt.compare(pass, hash_pass,async (err, result)=>{
                    if(result){
                        const token = jwt.sign({userId: user._id}, process.env.key)
                        res.status(201).send({"message":"Login success", "token": token,"userID":user._id,"name":user.name})
                    }else{
                        res.send({msg:"Something went wrong, check your passowrd and email"})
                    }
                })
            }
            else{
                res.send({msg:"your mail is not verified please register again"});
            }
            
        }
        
    } catch (error) {
        console.log(error);
        res.send({msg:"error"});
    }
})

module.exports=routes;