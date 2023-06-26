import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { Link } from 'react-router-dom'
import React from "react";
export default function AdminPanelSidebar() {
    return <>
        <Box display={"flex"} justifyContent={"center"}>
            <Avatar src="https://img.freepik.com/free-photo/top-view-business-office-desk-background-applying-job-form-pen-pencil-eyeglasses-tree-mobile-phone-wooden-table-background-with-copy-space_1921-22.jpg" sx={{ width: "150px", height: "150px" }}></Avatar>
        </Box>
        <List>
            <Link to={"/LoginUserRecord"} style={{color:"white",textDecoration:"none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <BookmarkBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary="User Record" sx={{"& span":{fontFamily:"Poppins"}}} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to={"/UserAttendenceRecord"} style={{color:"white",textDecoration:"none"}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ViewCompactIcon />
                        </ListItemIcon>
                        <ListItemText primary="User Attendence Record"  sx={{"& span":{fontFamily:"Poppins"}}} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to={"/UserLeaveRequest"} style={{color:"white",textDecoration:"none"}}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <TimeToLeaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="User Leave Request" sx={{"& span":{fontFamily:"Poppins"}}}  />
                </ListItemButton>
            </ListItem>
            </Link>
            <Link to={"/AdminReportGeneration"} style={{color:"white",textDecoration:"none"}}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <TimeToLeaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report Generation" sx={{"& span":{fontFamily:"Poppins"}}}  />
                </ListItemButton>
            </ListItem>
            </Link>

       
        </List>

    </>
}