import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
const app=express()
app.use(express.json())
app.use(cors())
const con=async()=>{
mongoose.connect("mongodb://localhost:27017/fileupload")
.then(()=>console.log('connected to mongoose'))
.catch((err)=>console.log(err))
}
con()
const schema=new mongoose.Schema({
    img:{
        type:String
    }
})
const model=mongoose.model('imgUpload',schema)
app.post('/',async(req,res)=>{
    const {base64}=req.body;
    try{
     await   model.create({img:base64})
        res.json({m:"ok"})
    }
    catch(err){
        res.json({m:err})
    }
})
app.get("/",async(req,res)=>{
    try{
        const date=await model.find()
        res.json({m:date})
    }
    catch(err){
        res.json({error:err})
    }
})
app.listen(3000,()=>console.log("connected on 9000"))