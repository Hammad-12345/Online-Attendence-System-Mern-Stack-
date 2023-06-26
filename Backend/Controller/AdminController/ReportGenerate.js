const  { ReportGenerateModel } = require('../../Models/AdminModel/ReportGenerateModel')
const Jwt=require('jsonwebtoken')
const AdminToken='Admin'
const AdminReportGenerateMiddleware = (req ,res ,next ) =>
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
const ReportGenerate = async( req , res ) =>
{
const { ID , TotalAttendence , Present , Absent , NotViewAttendence ,Date }=req.body.UserAttendenceData 
const { CurrentDate }=req.body

try {
    const findrecord=await ReportGenerateModel.find({UserID:ID,CurrentDate:CurrentDate})
    if(findrecord.length > 0)
    {   
        res.send({message:"You already create report of this user on this day"})
     
    }
    else 
    {
        const inserdoc=new ReportGenerateModel({
            TotalAttendence: TotalAttendence ,
            Present:Present ,
            Absent: Absent ,
            NotViewAttendence:NotViewAttendence ,
            NotViewAttendenceDate:Date ,
            CurrentDate:CurrentDate,
            UserID:ID
        })
        await inserdoc.save()
        res.send({message:"successfully create report"})
    }
} catch (error) {
    console.log(error)
}
}

module.exports={ AdminReportGenerateMiddleware ,ReportGenerate }