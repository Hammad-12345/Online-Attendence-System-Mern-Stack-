const mongoose=require('mongoose')

const LeaveRequestSchema=mongoose.Schema({
    LeaveRequestReason:{type:String},
    LeaveSchedule:{type:String},
    FromDays:{type:String},
    ToDays:{type:String},
    Hours:{type:String},
    Approved:{type:Boolean},
    NotApproved:{type:Boolean},
    Name:{type:String},
    PhoneNumber:{type:String},
    CnicNo:{type:String},
    Date:{type:String},
    UserID:{type:String}
})

const LeaveRequestModel=mongoose.model('LeaveRequest',LeaveRequestSchema)

module.exports={ LeaveRequestModel }