import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StoreImage  } from '../../Redux/UserRoutesReducer/UserProfileImageReduceer'
import { Falseuserroutes } from '../../Redux/UserRoutesReducer/UserProtectRoutes'
export default function UserPanelHeader() {
    const Navigate = useNavigate()
    const Dispatch = useDispatch()
    const userprofilepath = useSelector((state) => state.UserProfileImagepath)
    const UserData = useSelector((state) => state.UserProtect.UserProtectRouting)
    const ID = UserData.ID;
    const secretkey = `Bearer ${UserData.Secretkey}`

    useEffect(() => {
        const FetchUserSpecificMarkAttendence = async () => {
            try {
                const response = await fetch(`http://localhost:8000/User/Fetch/Profile/Image/${ID}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": secretkey
                        }
                    }
                )
                const actualres = await response.json()
                Dispatch(StoreImage(`http://localhost:8000/${actualres.ProfileImage}`))



            } catch (error) {
                console.log(error)
            }
        }
        FetchUserSpecificMarkAttendence()

    }, [ID, secretkey, Dispatch])
    const [open, updateopen] = useState(false)
    const handleClick = () => {
        updateopen(true)
    }
    const handleClose = () => {
        updateopen(false)
    }
    return <>
        <Box display={"flex"} justifyContent={"space-between"} p={2} sx={{ background: '#2E3B55' }} marginBottom={2}>
            <Typography variant="h6" component={"h1"} sx={{ color: "white", fontFamily: "Poppins" }}>
                User Attendence System
            </Typography>


            <Avatar
                id="basic-button"
                alt="Remy Sharp"
                src={userprofilepath}
                sx={{ width: 56, height: 56, cursor: "pointer" }}
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
                <MenuItem sx={{ fontFamily: "Poppins", textAlign: "center" }}><Link to={"/UserProfile"} style={{ color: "black", textDecoration: "none" }}>User Profile</Link></MenuItem>
                <MenuItem sx={{ fontFamily: "Poppins" }} onClick={() => {
                    localStorage.removeItem('Token')
                    Dispatch(Falseuserroutes())
                    Navigate('/')


                }
                } >Logout</MenuItem>
            </Menu>
        </Box>
    </>
}