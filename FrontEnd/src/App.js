import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterandLogin from "./UserPanel/RegistrationUser/Register&Login";
import MarkAttendence from "./UserPanel/Pages/Mark_Attendence";
import ViewMarkAttendence from "./UserPanel/Pages/View_MarkAttendence";
import LeaveRequest from "./UserPanel/Pages/Leave_Request";
import UserProfileImage from "./UserPanel/Pages/UserProfile";
import ViewLeaveRequest from "./UserPanel/Pages/ViewLeaveRequest";
import LoginUserRecord from "./AdminPanel/Pages/LoginUsersRecord";
import UserAttendenceRecord from "./AdminPanel/Pages/UserAttendenceRecord";
import UserLeaveRequest from "./AdminPanel/Pages/UserLeaverequest";
import AdminReportGeneration from "./AdminPanel/Pages/AdminReportGeneration";
import ViewReport from "./UserPanel/Pages/ViewReport";
import { useSelector } from "react-redux";

function App() {
 
  const data = useSelector((state) => state.UserProtect.UserProtectRouting)
  const dataadmin = useSelector((state) => state.AdminProtect.AdminProtectRouting)
  return <>
    <BrowserRouter>
      <Routes>
        {/* Registration and Login route */}
        {
          data || dataadmin ?
          <>
          {
            data ? <>
                      <Route path={'/*'} element={<MarkAttendence />} />
            </>
            :
            <>
                  <Route path={'/*'} element={<LoginUserRecord />} />
            </>
          }
          </>
          :
          null
        }
        {
         ! data && ! dataadmin &&  <>
            <Route path={'/*'} element={<RegisterandLogin />} />
          </>
          
        }

        {/* UserPanel Routes */}
        {
          data && <>
            <Route path={'/MarkAttendence'} element={<MarkAttendence />} />
            <Route path={'/ViewMarkAttendence'} element={<ViewMarkAttendence />} />
            <Route path={'/LeaveRequest'} element={<LeaveRequest />} />
            <Route path={'/UserProfile'} element={<UserProfileImage />} />
            <Route path={'/ViewLeaveRequest'} element={<ViewLeaveRequest />} />
            <Route path={'/ViewReport'} element={<ViewReport/>}/>
          </>
        }

        {/* Admin Panel Routes */}
        {
          dataadmin && <>
            <Route path={'/LoginUserRecord'} element={<LoginUserRecord />} />
            <Route path={'/UserAttendenceRecord'} element={<UserAttendenceRecord />} />
            <Route path={'/UserLeaveRequest'} element={<UserLeaveRequest />} />
            <Route path={'/AdminReportGeneration'} element={<AdminReportGeneration />} />
          </>
        }


      </Routes>
    </BrowserRouter>
  </>
}

export default App;
