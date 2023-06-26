const mongoose=require('mongoose')

const MarkAttendenceSchema=mongoose.Schema({
    MarkAttendence:{type:String},
    Approved:{type:Boolean},
    NotApproved:{type:Boolean},
    Name:{type:String},
    PhoneNumber:{type:String},
    CnicNo:{type:String},
    Date:{type:String},
    UserID:{type:String}
})

const Markattendencemodel=mongoose.model('MarkAttendence',MarkAttendenceSchema)

module.exports={ Markattendencemodel }