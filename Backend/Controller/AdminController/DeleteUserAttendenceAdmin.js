const Jwt = require('jsonwebtoken')
const AdminToken = 'Admin'
const { Markattendencemodel } = require('../../Models/UsersModel/MarkAttendenceModel')
const DeleteUserAttendenceMiddleware=(req,res,next)=>
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

const DeleteUserAttendence=async(req,res)=>
{
    const {ID}=req.params
    try {
        await Markattendencemodel.deleteOne({_id:ID})
        const Fetch =await Markattendencemodel.find({})
        console.log("succesfully delete user attendencen")
        res.send({Fetch:Fetch,message:"successfully delete user attendence"})
    } catch (error) {
        
    }
}
module.exports={ DeleteUserAttendenceMiddleware,DeleteUserAttendence}