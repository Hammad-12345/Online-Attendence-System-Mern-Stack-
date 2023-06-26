import React, { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material'
import './AllCss.css'
import UserPanelHeader from "../Components/Header";
import UserPanelSidebar from "../Components/SideBar";
import { useSelector } from "react-redux";
export default function ViewReport() {
    const [SetUserReport, UpdateUserReport] = useState([])
    const UserData = useSelector((state) => state.UserProtect.UserProtectRouting)
    console.log(UserData)
    const ID = UserData.ID;
    const secretkey = `Bearer ${UserData.Secretkey}`

    useEffect(() => {
        const fetchuserreport = async () => {
            const fetchuserreportspecifcbyid = await fetch(`http://localhost:8000/User/View/Report/${ID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": secretkey
                }

            })
            const ActualFetchUserReport = await fetchuserreportspecifcbyid.json()
            console.log(ActualFetchUserReport)
            UpdateUserReport([...ActualFetchUserReport])
        }
        fetchuserreport()
    }, [ID, secretkey])

    return <>


        <Box component={"div"} className="maindiv">
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <UserPanelSidebar />
            </Box>
            <Box flex={1} flexDirection={"column"}  >
                <UserPanelHeader />

                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={3}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h4" sx={{ fontFamily: "Poppins" }}>View Report</Typography>
                    <Box width={"80%"} display={"flex"}>
                        {
                            SetUserReport.map(element =>
                            (
                                <>
                                    <Box flex={300}>
                                        <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>TotalAttendence</Typography>
                                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{element.TotalAttendence}</Typography>
                                        <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>Present</Typography>
                                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{element.Present}</Typography>
                                        <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>Absent</Typography>
                                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{element.Absent}</Typography>
                                        <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>Do not view attendence</Typography>
                                        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{element.NotViewAttendence}</Typography>
                                        <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>Not View Attendence Dates</Typography>
                                        {
                                            element.NotViewAttendenceDate.map(newelement=>
                                                (
                                                    <>
                                                <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{newelement.Date}</Typography>
                                                    </>
                                                ))
                                        }
                                         <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>Date</Typography>
                                         <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>{element.CurrentDate}</Typography>
                                    </Box>
                                </>
                            ))
                        }


                    </Box>
                </Box>

            </Box>



        </Box>




    </>
}