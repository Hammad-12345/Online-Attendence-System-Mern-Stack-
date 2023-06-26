import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { Link } from 'react-router-dom'
import React from "react";
import { useSelector } from "react-redux";
export default function UserPanelSidebar() {
    const userprofilepath=useSelector((state)=>state.UserProfileImagepath)
    return <>
        <Box display={"flex"} justifyContent={"center"}>
            <Avatar src={userprofilepath} sx={{ width: "150px", height: "150px" }}></Avatar>
        </Box>
        <List>
            <Link to={"/MarkAttendence"} style={{color:"white",textDecoration:"none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <BookmarkBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mark Attendence" sx={{"& span":{fontFamily:"Poppins"}}} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to={"/ViewMarkAttendence"} style={{color:"white",textDecoration:"none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ViewCompactIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Attendence"  sx={{"& span":{fontFamily:"Poppins"}}} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to={"/LeaveRequest"} style={{color:"white",textDecoration:"none"}}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <TimeToLeaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Leave Request" sx={{"& span":{fontFamily:"Poppins"}}}  />
                </ListItemButton>
            </ListItem>
            </Link>
            <Link to={"/ViewLeaveRequest"} style={{color:"white",textDecoration:"none"}}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <TimeToLeaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Leave Request" sx={{"& span":{fontFamily:"Poppins"}}}  />
                </ListItemButton>
            </ListItem>
            </Link>
            <Link to={"/ViewReport"} style={{color:"white",textDecoration:"none"}}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <TimeToLeaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Report" sx={{"& span":{fontFamily:"Poppins"}}}  />
                </ListItemButton>
            </ListItem>
            </Link>
       
        </List>

    </>
}