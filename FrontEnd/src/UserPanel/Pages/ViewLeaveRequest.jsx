import React, { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import './AllCss.css'
import UserPanelHeader from "../Components/Header";
import UserPanelSidebar from "../Components/SideBar";
import { useSelector } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
export default function ViewLeaveRequest() {
    const [ViewLeaveRequest, UpdateViewLeaveRequest] = useState([])
    console.log(ViewLeaveRequest)
    const UserData = useSelector((state) => state.UserProtect.UserProtectRouting)
    const ID = UserData.ID;
    const secretkey = `Bearer ${UserData.Secretkey}`
    useEffect(() => {
        const FetchUserSpecificMarkAttendence = async () => {
            try {
                const response = await fetch(`http://localhost:8000/User/Fetch/specific/Leave/Request/${ID}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": secretkey
                        }
                    }
                )
                const actualres = await response.json()
                UpdateViewLeaveRequest([...actualres])


            } catch (error) {
                console.log(error)
            }
        }
        FetchUserSpecificMarkAttendence()

    }, [ID,secretkey])
    return <>
        <Box component={"div"} className="maindiv" >
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <UserPanelSidebar />
            </Box>
            <Box flex={1}>
                <UserPanelHeader />
                <Box display={"flex"} flexDirection={"column"} gap={2} p={0}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h4" sx={{ fontFamily: "Poppins" }}>View Leave Request</Typography>
                    <Box >
                        <TableContainer >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>Leave Request Reason</TableCell>
                                   
                                        <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>From</TableCell>
                                        <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>To</TableCell>
                                        <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>Hours</TableCell>
                                        <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>Approved</TableCell>
                                        <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>Not Approved</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>Date</TableCell>
                                 
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {ViewLeaveRequest.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.LeaveRequestReason}</TableCell>
                                            <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.FromDays}</TableCell>
                                            <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.ToDays}</TableCell>
                                            <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.Hours}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>{
                                            row.Approved ? <><Typography sx={{ fontFamily: "Poppins",color:"green"}}><DoneIcon/></Typography></>
                                            :
                                            <><Typography sx={{ fontFamily: "Poppins",color:"red"}}><CloseIcon/></Typography></>
                                            }</TableCell>
                                            <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>{
                                            row.NotApproved ?
                                        
                                             <><Typography sx={{ fontFamily: "Poppins",color:"green"}}><DoneIcon/></Typography></>
                                            :
                                            <><Typography sx={{ fontFamily: "Poppins",color:"red"}}><CloseIcon/></Typography></>    
                                        }</TableCell>
                                            <TableCell  sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.Date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>

            </Box>
        </Box>

    </>
}