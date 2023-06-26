const Jwt = require('jsonwebtoken')
const AdminToken = 'Admin'
const { LeaveRequestModel } = require('../../Models/UsersModel/LeaveRequestModel')
const EditUsersLeaveRequestMiddleware = ( req ,res ,next ) =>
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
const EditUsersLeaveRequest = async( req,res ) =>
{
    const { ID, ApprovedAndNotApproved } = req.body.EditState
    if (ApprovedAndNotApproved == 'Approved') {
        try {
            await LeaveRequestModel.updateOne({_id:ID},{ $set:{Approved:true,NotApproved:false}},{})
            const Fetch =await LeaveRequestModel.find({})
            res.send({Fetch:Fetch,message:" successfully edit user leave "})
        } catch (error) {
            res.send(error)
        }
    }
    else {
        try {
            await LeaveRequestModel.updateOne({_id:ID},{ $set:{Approved:false,NotApproved:true}},{})
            const Fetch =await LeaveRequestModel.find({})
            res.send({Fetch:Fetch,message:" successfully edit user leave "})
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = { EditUsersLeaveRequestMiddleware , EditUsersLeaveRequest }