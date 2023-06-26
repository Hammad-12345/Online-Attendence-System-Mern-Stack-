import React, { useState } from "react";
import { Avatar, Box, IconButton, TextField, Typography } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './AllCss.css'
import UserPanelHeader from "../Components/Header";
import UserPanelSidebar from "../Components/SideBar";
import { useDispatch, useSelector  } from "react-redux";
import { StoreImage } from '../../Redux/UserRoutesReducer/UserProfileImageReduceer'
export default function UserProfileImage() {
    const [profileimage,updateprofileimage] = useState('')
    const Dispatch = useDispatch()
    const userprofilepath=useSelector((state)=>state.UserProfileImagepath)
    const UserData=useSelector((state)=>state.UserProtect.UserProtectRouting)
    const ID=UserData.ID;
    const secretkey=`Bearer ${UserData.Secretkey}`
    const UpdateProfileImage = async(e) =>
    {
        const formdata=new FormData()
        formdata.append('Imagepath',e.target.files[0])
        formdata.append('ID',ID)

        const UpdateUserImage = await fetch('http://localhost:8000/User/Update/Profile/Image',
        {
            method:"PUT",
            body:formdata,
            headers:{
                "Authorization":secretkey
            }
        })
        const FetchUpdateImage = await UpdateUserImage.json()

        Dispatch(StoreImage(`http://localhost:8000/${FetchUpdateImage.path}`))
        updateprofileimage("")
    }
    return <>
        <Box component={"div"} className="maindiv" >
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <UserPanelSidebar />
            </Box>
            <Box flex={1}>
                <UserPanelHeader />
                <Box display={"flex"} flexDirection={"column"} gap={2} alignItems={"center"}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h4" sx={{ fontFamily: "Poppins" }}>Update Profile Image</Typography>
                    <Box width={"200px"} height={"200px"} borderRadius={"50%"} position={"relative"} overflow={"hidden"}>
                        <Avatar  src={userprofilepath} sx={{ width: "100%", height: "100%" }}></Avatar>
                        <Box position={"absolute"} bottom={0} p={1} sx={{ backgroundColor: "#444", }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <TextField type="file" sx={{ opacity: "0",position:"relative",zIndex:"10000" }} value = { profileimage }  onChange={UpdateProfileImage}/>
                            <IconButton variant={"contained"} aria-label="delete" sx={{ position: "absolute", color: "white" }}>
                                <CameraAltIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>

    </>
}