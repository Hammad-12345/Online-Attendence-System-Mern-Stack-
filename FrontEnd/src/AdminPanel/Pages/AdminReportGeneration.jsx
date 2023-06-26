import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import '../../UserPanel/Pages/AllCss.css'
import AdminPanelHeader from "../Components/Header";
import AdminPanelSidebar from "../Components/SideBar";
import { useSelector } from "react-redux";
export default function AdminReportGeneration() {
    const [FetchRegisterUserData, UpdateRegisterUser] = useState([])
    const [ShowReport, UpdateShowReport] = useState(true)
    const [ShowMessage,updateShowMessage]=useState('')
    const [UserAttendenceData, UpdateUserAttendenceData] = useState({
        ID:"",
        TotalAttendence: "",
        Present: "",
        Absent: "",
        NotViewAttendence: "",
        Date:[]
    })
    console.log(UserAttendenceData)
    const [open, updateopen] = useState(false)
    const dataadmin = useSelector((state) => state.AdminProtect.AdminProtectRouting)
    const token = `Bearer ${dataadmin.SecretKey}`
    useEffect(() => {
        const FetchRegisterUsersRecord = async () => {
            const Fetch = await fetch('http://localhost:8000/Admin/Fetch/Register/User/Record',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })
            const ActualFetch = await Fetch.json()
            UpdateRegisterUser([...ActualFetch.Fetch])
        }
        FetchRegisterUsersRecord()
    }, [token])

    const ViewAttendence = async (ID) => {
        const FetchAttendence = await fetch(`http://localhost:8000/Admin/Fetch/All/Attendence/Specific/User/By/${ID}`,
            {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            })
        const ActualFetch = await FetchAttendence.json()
        console.log(ActualFetch)
        if(ActualFetch.message)
        {
            UpdateShowReport(false)
            updateopen(true)
        }
        else 
        {
            UpdateShowReport(true)
            updateopen(true)
            UpdateUserAttendenceData({...UserAttendenceData,...ActualFetch})
        }
       
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2
    };
    const handleClose = () => {
        updateopen(false)
        UpdateUserAttendenceData({
            ID:"",
            TotalAttendence: "",
            Present: "",
            Absent: "",
            NotViewAttendence: "",
            Date:[]
        })
    }
    const CreateReport=async()=>
    {
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY   
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        const generate_repo = await fetch('http://localhost:8000/Admin/Report/Generate',
        {
            method:'POST',
            body:JSON.stringify({UserAttendenceData:UserAttendenceData,CurrentDate:currentDate}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }

        })
        const actual_generate_repo = await generate_repo.json()
        console.log(actual_generate_repo)
        updateShowMessage(actual_generate_repo.message)
        setTimeout(()=>
        {
            updateShowMessage('')
            UpdateUserAttendenceData({
                ID:"",
                TotalAttendence: "",
                Present: "",
                Absent: "",
                NotViewAttendence: "",
                Date:[]
            })   
            updateopen(false)
        },2000)
     
    }
    return <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h1" display={"flex"} justifyContent={"center"} sx={{ fontFamily: "Poppins" }}>
                    View User Report
                </Typography>

                <Box display={"flex"} justifyContent={"center"} fontSize={20} position={"relative"} boxShadow={2} zIndex={10000}>{ShowMessage}</Box>

                <Box display={"flex"} flexDirection={"column"} gap={3} alignItems={"center"}>
                    {
                        ShowReport ? <>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>TotalAttendence</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{UserAttendenceData.TotalAttendence}</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>Present</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{UserAttendenceData.Present}</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>Absent</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{UserAttendenceData.Absent}</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>Do not view attendence</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{UserAttendenceData.NotViewAttendence}</Typography>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>Not View Attendence Dates</Typography>
                        {
                            UserAttendenceData.Date.map(element=>
                                (
                                    <>
                                    <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{element.Date}</Typography>
                                    </>
                                ))
                        }

                        <Button variant="contained" sx={{ fontFamily: "Poppins",alignSelf:"flex-end" }} onClick={CreateReport}> Generate Report of User</Button>
                        
                        </>
                        
                            :
                            <Typography variant="h5" sx={{ fontFamily: "Poppins" }} display={"flex"} justifyContent={"center"}>User Have No Attendence</Typography>
                    }
                </Box>



            </Box>
        </Modal>
        <Box component={"div"} className="maindiv">
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <AdminPanelSidebar />
            </Box>
            <Box flex={1} flexDirection={"column"}  >
                <AdminPanelHeader />
                <Box display={"flex"} flexDirection={"column"} gap={2} p={4}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h5" sx={{ fontFamily: "Poppins" }}>Report Generate Module </Typography>

                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Name</TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Gmail</TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Number</TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Gender</TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Cnic No</TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Action</TableCell>



                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {FetchRegisterUserData.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.Name}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.Email}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.PhoneNumber}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.Gender}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.CnicNo}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}><Button variant="contained" onClick={() => ViewAttendence(row._id)}>Attendence</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box >

            </Box>
        </Box>
    </>
}