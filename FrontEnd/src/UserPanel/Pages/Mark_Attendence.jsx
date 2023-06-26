import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import './AllCss.css'
import UserPanelHeader from "../Components/Header";
import UserPanelSidebar from "../Components/SideBar";
import { useSelector } from "react-redux";
export default function MarkAttendence() {
    const [markatt,updatemark]=useState('')
    const [showtext,updatetext]=useState('')
    const [ShowAttendencemessge,updateshowattendencemessage]=useState(false)
    const UserData=useSelector((state)=>state.UserProtect.UserProtectRouting)
    console.log(UserData)
    const ID=UserData.ID;
    const secretkey=`Bearer ${UserData.Secretkey}`
    const handleChange=async(e)=>
    {
        updatemark(e.target.value)
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY   
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        try {
            const response=await fetch('http://localhost:8000/User/Mark/Attendence',
            {
                method:"POST",
                body:JSON.stringify({[e.target.name]:e.target.value,Approved:false,NotApproved:false,CurrentDate:currentDate,ID:ID}),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":secretkey
                }
            }
            )
            const actualres=await response.json()
            console.log(actualres)
            setTimeout(()=>
            {
                updatemark('')
            },3000)
            updateshowattendencemessage(true)
            updatetext(actualres.message)
            setTimeout(()=>
            {
                updateshowattendencemessage(false)
            },3000)
    
        } catch (error) {
            console.log(error)
        }
     

    }
    return <>
    {
        ShowAttendencemessge && <>
           <Box p={2} position={"absolute"} top={"0"} zIndex={10000} left={"50%"} sx={{backgroundColor:"white",color:"black",transform:"translate(-50%,50%)"}}>{showtext}</Box>
        </>
    }
 
        <Box component={"div"} className="maindiv">
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <UserPanelSidebar />
            </Box>
            <Box flex={1} flexDirection={"column"}  >
                <UserPanelHeader />

                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={3}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h4" sx={{ fontFamily: "Poppins" }}>Mark Attendence</Typography>
                    <Box width={"80%"}>
                        <FormControl  fullWidth>
                        <InputLabel id="demo-simple-select-label">Mark Attendence</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"       
                            label="Mark Attendence"
                            name="MarkAttendence"
                            value={markatt}
                            onChange={handleChange}
                        >
                            <MenuItem value={'present'}>Present</MenuItem>
                           
                        </Select>
                    </FormControl>
                    </Box>
                    
                </Box>



            </Box>
        </Box>



    </>
}