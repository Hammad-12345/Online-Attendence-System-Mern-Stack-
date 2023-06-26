const { Markattendencemodel } = require('../../Models/UsersModel/MarkAttendenceModel')
const jwt = require('jsonwebtoken')
const TokenKey = "Sign in"
const fetch_user_auth_middleware=(req,res,next)=>
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
const fetch_user_specific_attendence=async(req,res)=>
{
    try {
        const {UserID}=req.params
        const response=await Markattendencemodel.find({UserID:UserID})
        console.log(response)
        res.send(response)

    } catch (error) {
        res.send(error)
    }

}
module.exports={ fetch_user_auth_middleware,fetch_user_specific_attendence }