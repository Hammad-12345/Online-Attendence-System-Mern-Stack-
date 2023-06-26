const { LeaveRequestModel } =require('../../Models/UsersModel/LeaveRequestModel')
const { SignupModel } = require('../../Models/UsersModel/SignupModel')
const jwt = require('jsonwebtoken')
const TokenKey = "Sign in"
const LeaveRequestMiddleware=(req,res,next)=>
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
const LeaveRequestData=async(req,res)=>
{
    try {
        const { Approved, NotApproved, Date, ID } = req.body
        const { LeaveReason,LeaveSchedule,FromDays,ToDays,Hours }=req.body.LeaveModule
        const data = await SignupModel.find({ _id: ID })
        const { Name, PhoneNumber, CnicNo } = data[0];
        const response = await LeaveRequestModel.find({ Date: Date, UserID: ID })
        if (response.length > 0) {
            res.send({ message: "you already send leave request on this day" })
            console.log("you already send leave request on this day")
        }
        else {
            const insertdoc = new LeaveRequestModel({
                LeaveRequestReason:LeaveReason,
                LeaveSchedule:LeaveSchedule,
                FromDays:FromDays,
                ToDays:ToDays,
                Hours:Hours,
                Approved:Approved,
                NotApproved:NotApproved,
                Name:Name,
                PhoneNumber:PhoneNumber,
                CnicNo:CnicNo,
                Date:Date,
                UserID:ID
            })
            await insertdoc.save()
            console.log("successfully send leave Request")
            res.send({ message: "successfully send leave Request" })
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
module.exports={LeaveRequestMiddleware,LeaveRequestData}