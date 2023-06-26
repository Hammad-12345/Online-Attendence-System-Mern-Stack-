const mongoose=require('mongoose')

const connectdb=async()=>
{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/OnlineAttendence')
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
  
}
module.exports={connectdb}
