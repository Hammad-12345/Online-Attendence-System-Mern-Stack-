var mongoose = require("mongoose");
const Jwt=require('jsonwebtoken')
const AdminToken='Admin'
const AdminLoginController=async(req,res)=>
{
    const {Email,Password}=req.body.Login
    var db = mongoose.connection;
    
   
    try {
        const response=await db.collection('Admin_Login').find({Email: Email, Password:Password}).toArray()
        if(response.length > 0)
        {
            const SecretKey=Jwt.sign({},AdminToken)
            res.send({message:"Admin Succesfully Login",SecretKey:SecretKey})
        }
        else 
        {
            res.send({message:"Admin Credentials is not valid "})
        }
    } catch (error) {
        res.send(error)
    }
        
    
    


}
module.exports={ AdminLoginController }