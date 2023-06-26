import { createSlice } from "@reduxjs/toolkit";
export const AdminProtectRoutes=createSlice(
    {
        name:"AdminProtectDashboard",
        initialState:{
            AdminProtectRouting:JSON.parse(localStorage.getItem('Admin'))
        },
        reducers:{
            StoreDataAdmin:(state,action)=>
            {
                 state.AdminProtectRouting=action.payload
            },
            FalseAdminRoutes:(state)=>
            {
                state.AdminProtectRouting=false
            }
        }
    }
)
export const { StoreDataAdmin,FalseAdminRoutes}=AdminProtectRoutes.actions
export default AdminProtectRoutes.reducer