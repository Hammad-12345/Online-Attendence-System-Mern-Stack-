const jwt = require('jsonwebtoken')
const TokenKey = "Sign in"
const { SignupModel } = require('../../Models/UsersModel/SignupModel')
const fetch_user_profileimage_middleware = (req, res, next) => {
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
const fetch_user_profileimage_attendence = async (req, res) => {
    try {
        const { UserID } = req.params
        const data = await SignupModel.find({ _id: UserID })
        const {ProfileImage}=data[0]
        res.send({ProfileImage:ProfileImage})
    } catch (error) {
        res.send(error)
    }

}
module.exports = { fetch_user_profileimage_middleware, fetch_user_profileimage_attendence }