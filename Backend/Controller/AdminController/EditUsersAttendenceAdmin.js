const Jwt = require('jsonwebtoken')
const AdminToken = 'Admin'
const { Markattendencemodel } = require('../../Models/UsersModel/MarkAttendenceModel')
const EditUsersAttendenceAdminMiddleware = (req, res, next) => {
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
const EditUsersAttendence = async(req, res) => {
    const { ID, ApprovedAndNotApproved } = req.body.EditState
    if (ApprovedAndNotApproved == 'Approved') {
        try {
            await Markattendencemodel.updateOne({_id:ID},{ $set:{MarkAttendence:"present",Approved:true,NotApproved:false}},{})
            const Fetch =await Markattendencemodel.find({})
            res.send({Fetch:Fetch,message:"successfully edit user attendence"})
        } catch (error) {
            res.send(error)
        }
    }
    else {
        try {
            await Markattendencemodel.updateOne({_id:ID},{ $set:{MarkAttendence:"absent",Approved:false,NotApproved:true}},{})
            const Fetch =await Markattendencemodel.find({})
            res.send({Fetch:Fetch,message:"successfully edit user attendence"})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = { EditUsersAttendenceAdminMiddleware, EditUsersAttendence }