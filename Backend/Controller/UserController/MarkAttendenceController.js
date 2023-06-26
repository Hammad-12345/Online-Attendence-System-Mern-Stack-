const { Markattendencemodel } = require('../../Models/UsersModel/MarkAttendenceModel')
const { SignupModel } = require('../../Models/UsersModel/SignupModel')
const jwt = require('jsonwebtoken')
const TokenKey = "Sign in"
const MarkAttendenceMiddleware = (req, res, next) => {
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
const MarkAttendenceRequest = async (req, res) => {
    try {
        const { MarkAttendence, Approved, NotApproved, CurrentDate, ID } = req.body
        const data = await SignupModel.find({ _id: ID })
        const { Name, PhoneNumber, CnicNo } = data[0];
        const response = await Markattendencemodel.find({ Date: CurrentDate, UserID: ID })
        if (response.length > 0) {
            res.send({ message: "you already mark attendence present on this day" })
            console.log("you already mark attendence present on this day")
        }
        else {
            const insertdoc = new Markattendencemodel({
                MarkAttendence: MarkAttendence,
                Approved: Approved,
                NotApproved: NotApproved,
                Name: Name,
                PhoneNumber: PhoneNumber,
                CnicNo: CnicNo,
                Date: CurrentDate,
                UserID: ID
            })
            await insertdoc.save()
            res.send({ message: "successfully attendence mark" })
        }

    } catch (error) {
        res.send(error)
    }


}
module.exports = { MarkAttendenceMiddleware, MarkAttendenceRequest }