const Jwt=require('jsonwebtoken')
const AdminToken='Admin'
const { SignupModel }=require('../../Models/UsersModel/SignupModel')
const AdminFetchRegisterUserRecordMiddleware=(req,res,next)=>
{
    if(req.headers.authorization)
    {
        const secrettoken=req.headers.authorization.split(' ')
        Jwt.verify(secrettoken[1],AdminToken,(err)=>
        {
            if(err)
            {
                res.send({message:"Un Authorized Admin"})
            }
            else 
            {
                next()
            }
        })
    }
    else 
    {
        res.send({message:"Un Authorize Admin"})
    }
}
const FetchRegisterUserRecord=async(req,res)=>
{
    try {
        const Fetch_Register_User=await SignupModel.find()
        res.send({Fetch:Fetch_Register_User})
    } catch (error) {
        res.send(error)
    }
  

}
module.exports={ AdminFetchRegisterUserRecordMiddleware , FetchRegisterUserRecord }