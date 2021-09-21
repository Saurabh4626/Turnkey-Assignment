const express = require('express');
const dotenv =require('dotenv');
const cors=require('cors');
const mongoose = require('mongoose');
const User = require('./models/userModel')
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt')

const app=express();
const PORT=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
dotenv.config();



// connect to database
mongoose.connect(
    'mongodb+srv://root:root@cluster0.sgqty.mongodb.net/assignment'  
).then(()=>console.log("db connected"))




//  handling register route
app.post("/api/register", async(req,res)=>{

    try{
        const newPass=await bcrypt.hash(req.body.password,10)
        const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPass,
            contact:req.body.contact
		})
        return res.json({status:"ok"})
    } catch(err){
        return res.json({status:"not ok"})
        console.log(err)
    }
})

// handling login route
app.post("/api/login", async(req,res)=>{
    const user = await User.findOne({
		email: req.body.email,
	})
    const pass_valid=await bcrypt.compare(req.body.password,user.password)
    if (pass_valid){
        const token = jwt.sign({
            email:user.name,
            email:user.email
        },'secretcode')
        return res.json({status : 'ok',user : token})
    }else{
        return res.json({status :"not ok",user :false})
    }

})

// fetching from db and displaying to dashboard
app.get("/api/quote", async(req,res)=>{
    const token = req.headers['x-access-token']
    try{
        const decode=jwt.verify(token,'secretcode')
        const email = decode.email
        const user= await User.findOne({email:email})
        return res.json({status:"ok",contact:user.contact,name:user.name,email:user.email})
    } catch(error){
        console.log(error)
        return res.json({status:'not ok',error:'invalid token'})
    }
    

})



app.listen(PORT,()=>console.log(`running on server ${PORT} `))