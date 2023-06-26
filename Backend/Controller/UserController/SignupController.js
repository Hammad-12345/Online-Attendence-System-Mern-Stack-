const multer = require('multer')
const { SignupModel } = require('../../Models/UsersModel/SignupModel')
const bcrypt=require('bcrypt')
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './upload')
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})
const imgdata = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    }
    else {
        callback(new Error("Only Images are Allowed"))
    }
}

const uploadimg = multer({
    storage: imgconfig,
    fileFilter: imgdata
})
const SignupController = async(req, res) => {
    const {path}=req.file
    const hashpassword=await bcrypt.hash(req.body.Password,12)
    const {Name,FatherName,Email,PhoneNumber,Address,Gender,CnicNo}=req.body

try {
    const insertrec=new SignupModel(
        {
            Name: Name,
            FatherName:FatherName ,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Address:Address,
            Gender: Gender,
            CnicNo:CnicNo,
            Password:hashpassword,
            ProfileImage: path
        }
    )
    const response=await insertrec.save()
    console.log(response)
    res.send({message:"record insert"})
} catch (error) {
    res.send(error.keyValue)
}
    

}
module.exports = { SignupController, uploadimg }