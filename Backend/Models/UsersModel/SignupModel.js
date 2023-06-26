const mongoose=require('mongoose')

const SignupSchema=mongoose.Schema({
        Name: {type:String},
        FatherName:{type:String} ,
        Email: {type:String,unique:true},
        PhoneNumber: {type:String},
        Address: {type:String},
        Gender: {type:String},
        CnicNo: {type:String,unique:true},
        Password: {type:String},
        ProfileImage: {type:String}
})
const SignupModel=mongoose.model("UserSignup",SignupSchema)

module.exports={ SignupModel }