const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const model=require('./models/user.model')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const app= express();
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/full-mern-stack',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongoose connected")
})

app.post('/api/register',async(req,res)=>{
    console.log(req.body)
    try {
        const newPassword=await bcrypt.hash(req.body.password,10)
        const user=await model.create({
            name:req.body.name,
            email:req.body.email,
            password:newPassword,
        })      
        res.json({ status:"ok" })

    } catch (error) {
        res.json({ status:"error", error :'Duplicate email'})
    }
})

app.post('/api/login',async(req,res)=>{
    // console.log(req.body)
        const user=await model.findOne({
            email:req.body.email,
            // password:req.body.password,
        })     
        if (!user) {
            return res.json({ status :'error',error : "Invalid login"})
        }

        const isPasswordValid=await bcrypt.compare(req.body.password,user.password)
        //create a json web token
        if (isPasswordValid) {

            const token=jwt.sign({
                name:user.name,
                email:user.email,
            },'secret123',{expiresIn: '10seconds'})

           return res.json({ status:"ok", user : token})
        } else {
            return  res.json({ status:"error", user :'false'})
        }
})

app.get('/api/quote',async(req,res)=>{
    // console.log(req.body)
    const token=req.headers['x-access-token']
    try {
        const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        const user =await model.findOne({ email: email})
        return res.json({ status :"ok" , quote: user.quote })

    } catch (error) {
        console.log(error)
        res.json({ status:"error" ,error :"Invalid token"})
    }
      
})
app.post('/api/quote',async(req,res)=>{
    // console.log(req.body.jwt)
    const token=req.headers['x-access-token']
    try {
        const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        await model.updateOne(
            { email: email},
            { $set :{ quote:req.body.quote}}
            )
        return res.json({ status :"ok" })

    } catch (error) {
        console.log(error)
        res.json({ status:"error" ,error :"Invalid token"})
    }
      
})



app.listen(1337,()=>{
    console.log("server is started in 1337")
})
