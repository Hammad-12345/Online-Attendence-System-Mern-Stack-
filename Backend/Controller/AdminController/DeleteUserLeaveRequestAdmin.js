const Jwt = require('jsonwebtoken')
const AdminToken = 'Admin'
const { LeaveRequestModel } =require('../../Models/UsersModel/LeaveRequestModel')
const DeleteUsersLeaveRequestMiddleware=(req,res,next)=>
{
    if (req.headers.authorization) {
        const secrettoken = req.headers.authorization.split(' ')
        Jwt.verify(secrettoken[1], AdminToken, (err) => {
            if (err) {
                res.send({ message: "Un Authorized Admin" })
            }
            else {
                next()
            }
        })
    }
    else {
        res.send({ message: "Un Authorize Admin" })
    }
}
const DeleteUsersLeaveRequest=async(req,res)=>
{
    const {ID}=req.params
    try {
        await LeaveRequestModel.deleteOne({_id:ID})
        const Fetch =await LeaveRequestModel.find({})
        console.log(" succesfully delete leave request ")
        res.send({Fetch:Fetch,message:" succesfully delete leave request "})
    } catch (error) {
        
    }
}
module.exports = { DeleteUsersLeaveRequestMiddleware , DeleteUsersLeaveRequest}