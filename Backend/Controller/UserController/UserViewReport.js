const jwt = require('jsonwebtoken')
const TokenKey = "Sign in"
const { ReportGenerateModel } = require('../../Models/AdminModel/ReportGenerateModel')
const ViewReportMiddleware = (req, res, next) => {
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
const ViewReport = async (req, res) => {
    try {
        const { ID } = req.params
        const fetcuserreport = await ReportGenerateModel.find({ UserID: ID })
        res.send(fetcuserreport)
    } catch (error) {
        console.log(error)
    }


}
module.exports = { ViewReportMiddleware, ViewReport }