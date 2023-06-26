import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { FalseAdminRoutes } from '../../Redux/AdminRoutesReducer/AdminProtectRoutes'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AdminPanelHeader()
{
    const Dispatch=useDispatch()
    const Navigate=useNavigate()
    const [open,updateopen]=useState(false)
    const handleClick=()=>
    {
updateopen(true)
    }
    const handleClose=()=>
    {
updateopen(false)
    }
    return<>
    <Box display={"flex"} justifyContent={"space-between"} p={2} sx={{ background: '#2E3B55'}} marginBottom={2}>
        <Typography variant="h6" component={"h1"} sx={{color:"white" ,fontFamily:"Poppins"}}>
            Admin Panel <br></br> User Attendence System
        </Typography>
    

            <Avatar
        id="basic-button"
        alt="Remy Sharp"
        src="https://img.freepik.com/free-photo/top-view-business-office-desk-background-applying-job-form-pen-pencil-eyeglasses-tree-mobile-phone-wooden-table-background-with-copy-space_1921-22.jpg"
        sx={{ width: 56, height: 56,cursor:"pointer" }}
        onClick={handleClick}
      >
      </Avatar>
      <Menu
        id="basic-menu"
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      
      >
        <MenuItem sx={{fontFamily:"Poppins"}} 
        onClick={() => {
            localStorage.removeItem('Admin')
            Dispatch(FalseAdminRoutes())
            Navigate('/') }}>Logout</MenuItem>
      </Menu>
    </Box>
    </>
}