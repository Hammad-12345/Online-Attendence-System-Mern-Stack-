const jwt = require('jsonwebtoken')
const TokenKey = "Sign in"
const multer = require('multer')
const { SignupModel } = require('../../Models/UsersModel/SignupModel')
const UpdateUserProfileImageMiddleware = (req ,res ,next ) =>
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

const uploadimage = multer({
    storage: imgconfig,
    fileFilter: imgdata
})
const UpdateUserProfileImages = async(req ,res) =>
{
    const { path } = req.file ;
    const { ID } = req.body

    try {
       const update= await SignupModel.updateOne({_id:ID},{ $set : {
            ProfileImage : path}} ,{})
            if(update.acknowledged)
            {
                res.send({path:path , message : "Succesfully update Image"})
            }
    } catch (error) {
        res.send(error)
    }

  

}

module.exports = { UpdateUserProfileImageMiddleware , uploadimage , UpdateUserProfileImages }