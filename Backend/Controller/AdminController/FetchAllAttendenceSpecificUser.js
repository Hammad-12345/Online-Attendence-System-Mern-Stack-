const Jwt = require('jsonwebtoken')
const AdminToken = 'Admin'
// const { LeaveRequestModel } = require('../../Models/UsersModel/LeaveRequestModel')
const { Markattendencemodel } = require('../../Models/UsersModel/MarkAttendenceModel')
const FetchAllAttendenceSpecificUserMiddleware = (req, res, next) => {
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
const FetchAllAttendenceSpecificUser = async (req, res) => {
    try {
        const { ID } = req.params

        const Attendence = await Markattendencemodel.find({ UserID: ID })
        if (Attendence.length > 0) {
            const Present = Attendence.filter(Element => {
                return Element.Approved == true
            })
            const Absent = Attendence.filter(Element => {
                return Element.NotApproved == true
            })
            const NotView = Attendence.filter(Element=>
                {
                    return Element.Approved == false && Element.NotApproved == false
                })
       
            NotView.forEach(element => {
                console.log(element.Date)
            })
            if(NotView.length > 0)
            {
                res.send({TotalAttendence:Attendence.length,Present:Present.length,Absent:Absent.length,NotViewAttendence:NotView.length,Date:NotView,ID:ID})
            }
            else
            {
                res.send({TotalAttendence:Attendence.length,Present:Present.length,Absent:Absent.length,NotViewAttendence:"All View",ID:ID})
            }
          
        }
        else {
          res.send({message:"No Attendence"})
        }
    } catch (error) {

    }

}
module.exports = { FetchAllAttendenceSpecificUserMiddleware, FetchAllAttendenceSpecificUser }