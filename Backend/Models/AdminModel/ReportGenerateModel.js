const mongoose = require('mongoose')

const ReportGenerateSchema = mongoose.Schema({
    TotalAttendence: { type: String },
    Present: { type: String },
    Absent: { type: String },
    NotViewAttendence:{type:String},
    NotViewAttendenceDate:{type:Array},
    CurrentDate:{type:String},
    UserID:{type:String}

})

const ReportGenerateModel = mongoose.model('ReportGenerate',ReportGenerateSchema)

module.exports = { ReportGenerateModel }