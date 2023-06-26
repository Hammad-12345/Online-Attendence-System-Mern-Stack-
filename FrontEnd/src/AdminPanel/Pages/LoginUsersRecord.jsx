import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import '../../UserPanel/Pages/AllCss.css'
import React, { useEffect, useState } from "react";
import AdminPanelHeader from "../Components/Header";
import AdminPanelSidebar from "../Components/SideBar";
import { useSelector } from "react-redux";
export default function LoginUserRecord() {
    const [FetchRegisterUserData,UpdateRegisterUser]=useState([])
    const dataadmin = useSelector((state) => state.AdminProtect.AdminProtectRouting)
    const token=`Bearer ${dataadmin.SecretKey}`
    useEffect(()=>
    {
        const FetchRegisterUsersRecord=async()=>
        {
            const Fetch=await fetch('http://localhost:8000/Admin/Fetch/Register/User/Record',
            {
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            const ActualFetch=await Fetch.json()
            UpdateRegisterUser([...ActualFetch.Fetch])
        }
        FetchRegisterUsersRecord()
    },[token])
    return <>
        <Box component={"div"} className="maindiv">
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <AdminPanelSidebar />
            </Box>
            <Box flex={1} flexDirection={"column"}  >
                <AdminPanelHeader />
                <Box display={"flex"} flexDirection={"column"} gap={2} p={4}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h5" sx={{ fontFamily: "Poppins" }}>Register Users Records </Typography>
                    <Box >
                        <TableContainer >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>Name</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>Gmail</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>Number</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>Gender</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>Cnic No</TableCell>
                                 
                                        
                                 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {FetchRegisterUserData.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.Name}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.Email}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.PhoneNumber}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.Gender}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign:"center"}}>{row.CnicNo}</TableCell>
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