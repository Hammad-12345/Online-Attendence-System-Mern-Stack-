const Jwt=require('jsonwebtoken')
const AdminToken='Admin'
const { LeaveRequestModel } = require('../../Models/UsersModel/LeaveRequestModel')
const FetchAllLeaveRequestMiddlewareAdmin=(req,res,next)=>
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
const FetchAllleaverequest=async(req,res)=>
{
    try {
        const Fetch_All_Leave_Request=await LeaveRequestModel.find()
        res.send({Fetch:Fetch_All_Leave_Request})
    } catch (error) {
        res.send(error)
    }
}
module.exports={ FetchAllLeaveRequestMiddlewareAdmin , FetchAllleaverequest }