const jwt = require('jsonwebtoken')
const TokenKey = "Sign in"
const { LeaveRequestModel } =require('../../Models/UsersModel/LeaveRequestModel')
const FetchUserSpecificLeaveRequestMiddleware=(req,res,next)=>
{
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')
        jwt.verify(token[1], TokenKey, (err) => {
            if (err) {
                res.send({ message: "Un authorize user " })
            }
            else {
                next()
            }
        })
    }
}
const FetchUserSpecificLeaveRequest=async(req,res)=>
{
    try {
        const {UserID}=req.params
        const response=await LeaveRequestModel.find({UserID:UserID})
        console.log(response)
        res.send(response)

    } catch (error) {
        res.send(error)
    }

}
module.exports = { FetchUserSpecificLeaveRequestMiddleware , FetchUserSpecificLeaveRequest}