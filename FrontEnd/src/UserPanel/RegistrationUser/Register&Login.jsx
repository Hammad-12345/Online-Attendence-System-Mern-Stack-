import { Avatar, Box, Button, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import './Register.css'
import React, { useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StoreData } from '../../Redux/UserRoutesReducer/UserProtectRoutes'
import { StoreImage } from '../../Redux/UserRoutesReducer/UserProfileImageReduceer'
import { StoreDataAdmin } from '../../Redux/AdminRoutesReducer/AdminProtectRoutes'
export default function RegisterandLogin() {
    const Navigate = useNavigate()
    const Dispatch=useDispatch()
    const [RegisterandLogin, updateregisterandlogin] = useState(true)
    const [ShowLoginData, UpdateLoginData] = useState(false)
    const [ShowLoginText, updatelogintext] = useState("")
    const [RegisterSuccessornot, updateregistersuccess] = useState(false)
    const [data, updatedata] = useState('')
    const [Imagefile, Updateimagefile] = useState('')
    const [RegisterForm, UpdateRegisterForm] = useState({
        Name: "",
        FatherName: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
        Gender: "",
        CnicNo: "",
        Password: "",
        ProfileImage: ""

    })
    const [loginform, updateloginform] = useState({
        Email: "",
        Password: "",
        Type: ""
    })
    const Signin = async (e) => {
        e.preventDefault()
        if (loginform.Type === 'User') {
            try {
                const UserResponse = await fetch('http://localhost:8000/User/Login', {
                    method: "POST",
                    body: JSON.stringify({ Login: loginform }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const ActualRes = await UserResponse.json()
                if (ActualRes.message === "Successfully login") {
                    localStorage.setItem("Token", JSON.stringify(ActualRes))
                    Navigate('/MarkAttendence')
                    Dispatch(StoreData(JSON.parse(localStorage.getItem('Token'))))
                    const getdata=JSON.parse(localStorage.getItem('Token'))
                    Dispatch(StoreImage(`http://localhost:8000/${getdata.ProfileImagepath}`))
                    updateloginform
                        (
                            {
                                Email: "",
                                Password: "",
                                Type: ""
                            }
                        )
                }
                else if (ActualRes.message === 'Password Does Not Match') {
                    UpdateLoginData(true)
                    updatelogintext(ActualRes.message)
                    setTimeout(() => {
                        UpdateLoginData(false)
                    }, 2000)
                }
                else {
                    UpdateLoginData(true)
                    updatelogintext(ActualRes.message)
                    setTimeout(() => {
                        UpdateLoginData(false)
                    }, 2000)
                }
            } catch (error) {
                console.log(error)
            }

        }
        else {
            try {
                const AdminResponse = await fetch('http://localhost:8000/Admin/Login', {
                    method: "POST",
                    body: JSON.stringify({ Login: loginform }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const ActualRes = await AdminResponse.json()
                if (ActualRes.message === "Admin Succesfully Login") {
                    localStorage.setItem("Admin", JSON.stringify(ActualRes))
                    Navigate('/LoginUserRecord')
                    Dispatch(StoreDataAdmin(JSON.parse(localStorage.getItem('Admin'))))
                    updateloginform
                        (
                            {
                                Email: "",
                                Password: "",
                                Type: ""
                            }
                        )
                }
            } catch (error) {
                console.log(error)
            }

        }
    }
    const OpenLogin = () => {
        if (RegisterandLogin) {
            updateregisterandlogin(false)
        }
        else {
            updateregisterandlogin(true)
        }

    }
    const UserProfile = (e) => {
        Updateimagefile(e.target.files[0])
        const image = e.target.files[0]
        const Fileread = new FileReader();
        Fileread.readAsDataURL(image)
        Fileread.onload = () => {
            const image64 = Fileread.result
            console.log(image64)
            UpdateRegisterForm({ ...RegisterForm, ProfileImage: image64 })
        }
    }
    const RegisterUser = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("Name", RegisterForm.Name)
        data.append("FatherName", RegisterForm.FatherName)
        data.append("Email", RegisterForm.Email)
        data.append("PhoneNumber", RegisterForm.PhoneNumber)
        data.append("Address", RegisterForm.Address)
        data.append("Gender", RegisterForm.Gender)
        data.append("CnicNo", RegisterForm.CnicNo)
        data.append("Password", RegisterForm.Password)
        data.append("Imagepath", Imagefile)
        const response = await fetch('http://localhost:8000/User/Register',
            {
                method: "POST",
                body: data

            })
        const ActualRes = await response.json()

        if (ActualRes.message) {
            updatedata("Successfully Register")
            updateregistersuccess(true)
            UpdateRegisterForm({
                Name: "",
                FatherName: "",
                Email: "",
                PhoneNumber: "",
                Address: "",
                Gender: "Male",
                CnicNo: "",
                Password: "",
                ProfileImage: ""
            })
            setTimeout(() => {
                updateregistersuccess(false)
            }, 3000)
            updateregisterandlogin(true)
        }
        else if (ActualRes.Email) {
            updatedata("Email already Exists")
            updateregistersuccess(true)
            setTimeout(() => {
                updateregistersuccess(false)
            }, 3000)
        }
        else if (ActualRes.CnicNo) {
            updatedata("Cnic no already exists")
            updateregistersuccess(true)
            setTimeout(() => {
                updateregistersuccess(false)
            }, 3000)

        }
    }
    return <>
        <Box component={"div"} id="Registerlogin">
            <Stack flexDirection={'row'} width={"900px"} position={"relative"}>

                {
                    RegisterSuccessornot && <>
                        <Box position={"absolute"} top={"0px"} left={"50%"} width={"350px"} sx={{ transform: 'translate(-50%,50%)' }} backgroundColor={"#444"} color={"white"} p={1} zIndex={10000} display={"flex"} justifyContent={"center"}>{data}</Box>
                    </>

                }


                <Box width={"350px"} boxShadow={3}>
                    <Box component={'img'} height={"100%"} src={'https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo='} width={"100%"} ></Box>
                </Box>
                <Box display={'flex'} boxShadow={3} backgroundColor={"white"} flexDirection={"column"} p={2} gap={2} flex={1}>
                    {
                        RegisterandLogin ? <>
                            <Typography variant="h5" component={"h1"} display={"flex"} justifyContent={"center"}>Sign in</Typography>
                            {
                                ShowLoginData && <>
                                    <Typography variant="h6" display={"flex"} p={1} justifyContent={"center"} sx={{ backgroundColor: "red", color: "white" }}>{ShowLoginText}</Typography>
                                </>
                            }

                            <Box display={"flex"} flexDirection={"column"} gap={2} component={"form"} id="login_form" onSubmit={Signin}>
                                <Form label={"Email"} type={"email"} name={"Email"} value={loginform.Email} onChange={(e) => updateloginform({ ...loginform, [e.target.name]: e.target.value })} required />
                                <Form label={"Password"} type={"password"} name={"Password"} value={loginform.Password} onChange={(e) => updateloginform({ ...loginform, [e.target.name]: e.target.value })} required />
                                <FormControl >
                                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Type"
                                        name="Type"
                                        value={loginform.Type}
                                        onChange={(e) => updateloginform({ ...loginform, [e.target.name]: e.target.value })}
                                        required

                                    >
                                        <MenuItem value={"User"}>User</MenuItem>
                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                    </Select>
                                </FormControl>

                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Typography component={"h1"} sx={{ fontFamily: "Poppins", cursor: "pointer" }} onClick={OpenLogin}>Create account </Typography>
                                <Button sx={{ alignSelf: "flex-end" }} variant="contained" Form={"login_form"} type="submit">Sign in</Button>
                            </Box>
                        </>
                            :
                            <>
                                <Typography variant="h5" component={"h1"} display={"flex"} justifyContent={"center"}>Register Now</Typography>
                                <Box component={'form'} id="Register_Form" rowGap={2} display={"flex"} flexDirection={"column"} onSubmit={RegisterUser}>
                                    <Box display={"flex"} justifyContent={"center"}>
                                        <Box width={"30%"} height={"150px"} borderRadius={"50%"} position={"relative"} overflow={"hidden"}>
                                            <Avatar src={RegisterForm.ProfileImage} sx={{ width: "100%", height: "100%" }} />
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} sx={{ position: "absolute", bottom: "0", backgroundColor: "#73737399" }}>
                                                <TextField type="file" sx={{ opacity: "0", position: "relative", zIndex: "10000" }} name={"ProfileImage"} onChange={UserProfile} required />
                                                <IconButton variant={"contained"} aria-label="delete" sx={{ position: "absolute", color: "white" }}>
                                                    <CameraAltIcon />
                                                </IconButton>
                                            </Box>

                                        </Box>
                                    </Box>
                                    <Box display={"flex"} gap={1} >
                                        <Form label={"Name"} type={"text"} name={"Name"} value={RegisterForm.Name} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} required />
                                        <Form label={"Father_Name"} type={"text"} name={"FatherName"} value={RegisterForm.FatherName} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} required />
                                    </Box>
                                    <Box display={"flex"} gap={1}>
                                        <Form label={"Email"} type={"email"} name={"Email"} value={RegisterForm.Email} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} required />
                                        <Form label={"Phone_Number"} type={"text"} name={"PhoneNumber"} value={RegisterForm.PhoneNumber} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} required />
                                    </Box>
                                    <Box display={"flex"} gap={1}>
                                        <Box flex={1}>
                                            <Form label={"Address"} type={"text"} name={"Address"} value={RegisterForm.Address} multiline maxRows={3} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} required />
                                        </Box>
                                        <Box flex={1} display={"flex"} justifyContent={"center"} borderColor={"ThreeDLightShadow"}>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="Gender"

                                            >
                                                <FormControlLabel value={"female"} checked={RegisterForm.Gender === 'female'} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} control={<Radio />} label="Female" sx={{ "& span": { fontFamily: "Poppins" } }} required />
                                                <FormControlLabel value={"male"} checked={RegisterForm.Gender === 'male'} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} control={<Radio />} label="Male" sx={{ "& span": { fontFamily: "Poppins" } }} required />
                                            </RadioGroup>
                                        </Box>


                                    </Box>
                                    <Box display={"flex"} gap={1}>
                                        <Form label={"Cnic_No"} type={"text"} name={"CnicNo"} value={RegisterForm.CnicNo} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} required />
                                        <Form label={"Password"} type={"password"} name={"Password"} value={RegisterForm.Password} onChange={(e) => UpdateRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value })} required />
                                    </Box>
                                </Box>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Typography component={"h1"} sx={{ fontFamily: "Poppins", cursor: "pointer" }} onClick={OpenLogin}>Already have an account sign in </Typography>
                                    <Button sx={{ alignSelf: "flex-end" }} variant="contained" Form={"Register_Form"} type="submit">Register</Button>
                                </Box>

                            </>
                    }


                </Box>
            </Stack>
        </Box>
    </>
}