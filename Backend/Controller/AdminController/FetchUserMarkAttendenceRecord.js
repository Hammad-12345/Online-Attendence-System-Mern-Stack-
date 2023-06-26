const Jwt=require('jsonwebtoken')
const AdminToken='Admin'
const { Markattendencemodel } = require('../../Models/UsersModel/MarkAttendenceModel')
const AdminFetchUserAttendenceRecordMiddleware=(req,res,next)=>
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
const FetchUserMarkAttendenceRecord=async(req,res)=>
{
    try {
        const Fetch_Users_Mark_Attendence=await Markattendencemodel.find()
        res.send({Fetch:Fetch_Users_Mark_Attendence})
    } catch (error) {
        res.send(error)
    }
}
module.exports={ AdminFetchUserAttendenceRecordMiddleware,FetchUserMarkAttendenceRecord }