const express=require('express')
const { AdminLoginController }=require('../../Controller/AdminController/AdminLoginController')
const { AdminFetchRegisterUserRecordMiddleware , FetchRegisterUserRecord }=require('../../Controller/AdminController/FetchRegisterUserRecord')
const { AdminFetchUserAttendenceRecordMiddleware,FetchUserMarkAttendenceRecord } = require('../../Controller/AdminController/FetchUserMarkAttendenceRecord')
const { EditUsersAttendenceAdminMiddleware , EditUsersAttendence } =require('../../Controller/AdminController/EditUsersAttendenceAdmin')
const { DeleteUserAttendenceMiddleware,DeleteUserAttendence} =require('../../Controller/AdminController/DeleteUserAttendenceAdmin')
const { FetchAllLeaveRequestMiddlewareAdmin , FetchAllleaverequest } = require('../../Controller/AdminController/FetchAllLeaveRequestAdmin')
const  { EditUsersLeaveRequestMiddleware , EditUsersLeaveRequest } = require('../../Controller/AdminController/EditUserLeaveRequest')
const  { DeleteUsersLeaveRequestMiddleware , DeleteUsersLeaveRequest} = require('../../Controller/AdminController/DeleteUserLeaveRequestAdmin')
const { AdminReportGenerateMiddleware ,ReportGenerate } =require('../../Controller/AdminController/ReportGenerate')

const  { FetchAllAttendenceSpecificUserMiddleware,FetchAllAttendenceSpecificUser } = require('../../Controller/AdminController/FetchAllAttendenceSpecificUser')

const AdminRoutes=express.Router()


AdminRoutes.post('/Login',AdminLoginController)
AdminRoutes.get('/Fetch/Register/User/Record',AdminFetchRegisterUserRecordMiddleware,FetchRegisterUserRecord)
AdminRoutes.get('/Fetch/User/Mark/Attendence/Record',AdminFetchUserAttendenceRecordMiddleware,FetchUserMarkAttendenceRecord)
AdminRoutes.put('/Edit/Users/Attendence/Admin',EditUsersAttendenceAdminMiddleware,EditUsersAttendence)
AdminRoutes.delete('/Delete/Users/Attendence/Admin/:ID',DeleteUserAttendenceMiddleware,DeleteUserAttendence)
AdminRoutes.get('/Fetch/All/Leave/Request',FetchAllLeaveRequestMiddlewareAdmin,FetchAllleaverequest)
AdminRoutes.put('/Edit/Users/Leave/Admin',EditUsersLeaveRequestMiddleware,EditUsersLeaveRequest)
AdminRoutes.delete('/Delete/Users/Leave/Request/Admin/:ID',DeleteUsersLeaveRequestMiddleware,DeleteUsersLeaveRequest)
AdminRoutes.post('/Report/Generate',AdminReportGenerateMiddleware,ReportGenerate )
AdminRoutes.get('/Fetch/All/Attendence/Specific/User/By/:ID',FetchAllAttendenceSpecificUserMiddleware,FetchAllAttendenceSpecificUser )
module.exports={ AdminRoutes }