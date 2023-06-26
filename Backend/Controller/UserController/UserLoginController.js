const { SignupModel } = require('../../Models/UsersModel/SignupModel')
const bcrypt=require('bcrypt')
const jsonwebtoken=require('jsonwebtoken')
const TokenKey="Sign in"
const UserLoginController=async(req,res)=>
{
    try {
        const { Email,Password }=req.body.Login
        const response=await SignupModel.find({Email:Email})
        if(response.length > 0)
        {
            if (! await bcrypt.compare(Password, response[0].Password)) {
                res.send({ message: "Password Does Not Match" })
            }
            else 
            {
                const SecretKey=jsonwebtoken.sign({},TokenKey)
                res.send({message:"Successfully login",ID:response[0]._id,ProfileImagepath:response[0].ProfileImage,Secretkey:SecretKey})
            }
        }
        else 
        {
            res.send({message:"Email not found create first account"})
        }
    } catch (error) {
        console.log(error)
    }
  
}
module.exports={ UserLoginController }