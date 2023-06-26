import React, { useState } from "react";
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import './AllCss.css'
import UserPanelHeader from "../Components/Header";
import UserPanelSidebar from "../Components/SideBar";
import { useSelector } from "react-redux";
export default function LeaveRequest() {
    const [showtext,updatetext]=useState('')
    const [ShowAttendencemessge,updateshowattendencemessage]=useState(false)
    const [LeaveModule, UpdateLeaveModule] = useState({
        LeaveReason: "",
        LeaveSchedule: "",
        FromDays: "",
        ToDays: "",
        Hours: ""
    })
    const [LeaveRequestTrue, UpdateLeaveRequest] = useState(true)
    const UserData=useSelector((state)=>state.UserProtect.UserProtectRouting)
    console.log(UserData)
    const ID=UserData.ID;
    const secretkey=`Bearer ${UserData.Secretkey}`
    const SubmitLeaveRequest=async(e)=>
    {
        e.preventDefault()
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY   
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        try {
            const SendLeaveRequest=await fetch("http://localhost:8000/User/Leave/Request",
            {
                method:"POST",
                body:JSON.stringify({LeaveModule:LeaveModule,Approved:false,NotApproved:false,Date:currentDate,ID:ID}),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":secretkey
                }
            })
            const SendActualLeaveRequest=await SendLeaveRequest.json()
            UpdateLeaveModule({
                LeaveReason: "",
                LeaveSchedule: "",
                FromDays: "",
                ToDays: "",
                Hours: ""
            })
            updateshowattendencemessage(true)
            updatetext(SendActualLeaveRequest.message)
            setTimeout(()=>
            {
                updateshowattendencemessage(false)
                updatetext("")

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
        <Box component={"div"} className="maindiv" >
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <UserPanelSidebar />
            </Box>
            <Box flex={1} >
                <UserPanelHeader />
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={3}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h4" sx={{ fontFamily: "Poppins" }}>Leave Request</Typography>
                    <Box width={"850px"} component={"form"} id="LeaveRequest" display={"flex"} flexDirection={"column"} gap={2} onSubmit={SubmitLeaveRequest}>
                        <TextField fullWidth
                            id="outlined-multiline-static"
                            label="Enter Leave Request Reason"
                            required
                            multiline
                            rows={4}
                            sx={{ "& label": { fontFamily: "Poppins" } }}
                            value={LeaveModule.LeaveReason}
                            name="LeaveReason"
                            onChange={(e) => UpdateLeaveModule({ ...LeaveModule, [e.target.name]: e.target.value })}


                        />
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="LeaveSchedule"

                        >
                            <FormControlLabel value={"Days"} checked={LeaveModule.LeaveSchedule === 'Days'} onChange={(e) => {
                                UpdateLeaveModule({ ...LeaveModule, [e.target.name]: e.target.value })
                                if (e.target.value) {
                                    UpdateLeaveRequest(true)
                                }
                            }

                            }
                                control={<Radio />} label="Days" sx={{ "& span": { fontFamily: "Poppins" } }} required />
                            <FormControlLabel value={"Hours"} checked={LeaveModule.LeaveSchedule === 'Hours'} onChange={(e) => {
                                UpdateLeaveModule({ ...LeaveModule, [e.target.name]: e.target.value })
                                if (e.target.value) {
                                    UpdateLeaveRequest(false)
                                }
                            }}
                                control={<Radio />} label="Hours" sx={{ "& span": { fontFamily: "Poppins" } }} required />
                        </RadioGroup>
                        {
                            LeaveRequestTrue ?
                                <>
                                    <Box display={"flex"} gap={2}>
                                        <Box flex={1} display={"flex"} flexDirection={"column"} gap={2}>
                                            <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>From</Typography>
                                            <TextField type="Date" fullWidth value={LeaveModule.FromDays} name={"FromDays"} onChange={(e) => {
                                                UpdateLeaveModule({ ...LeaveModule, [e.target.name]: e.target.value, Hours: "" })
                                            }} required />
                                        </Box>
                                        <Box flex={1} display={"flex"} flexDirection={"column"} gap={2}>
                                            <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>To</Typography>
                                            <TextField type="Date" fullWidth value={LeaveModule.ToDays} name={"ToDays"} onChange={(e) => {
                                                UpdateLeaveModule({ ...LeaveModule, [e.target.name]: e.target.value, Hours: "No Hours" })
                                            }} required />
                                        </Box>



                                    </Box>
                                </>
                                :
                                <>
                                    <Box display={"flex"} flexDirection={"column"} gap={2}>

                                        <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>Select Hours</Typography>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Mark Attendence</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Mark Attendence"
                                                name="Hours"
                                                required
                                                sx={{ "& label": { fontFamily: "Poppins" } }}
                                                value={LeaveModule.Hours}
                                                onChange={(e) => UpdateLeaveModule({ ...LeaveModule, FromDays: "No Days", ToDays: "No Days", [e.target.name]: e.target.value, })}
                                            >
                                                <MenuItem value={'2 Hours'}>2 Hours</MenuItem>
                                                <MenuItem value={'4 Hours'}>4 Hours</MenuItem>
                                                <MenuItem value={'6 Hours'}>6 Hours</MenuItem>
                                                <MenuItem value={'8 Hours'}>8 Hours</MenuItem>

                                            </Select>
                                        </FormControl>

                                    </Box>
                                </>
                        }



                        <Button variant="contained" sx={{ alignSelf: "flex-end", fontFamily: "Poppins" }} type="submit">Send Leave Request</Button>
                    </Box>

                </Box>
            </Box>
        </Box>

    </>
}