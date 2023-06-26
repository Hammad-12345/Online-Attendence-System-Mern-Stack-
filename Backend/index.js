const express=require('express')
const cors=require('cors')
const { connectdb }=require('./Db/connection')
const  { Userrouter } =require('./Routes/UserRoutes/Routes')
const { AdminRoutes }=require('./Routes/AdminRoutes/AdminRoutes')
const app=express()
app.use(cors())
app.use(express.json());


connectdb()
app.use('/User',Userrouter)
app.use('/Admin',AdminRoutes)
app.use("/Upload",express.static("./upload"))

app.listen(8000,()=>
{
    console.log("Server are is in running form")
})