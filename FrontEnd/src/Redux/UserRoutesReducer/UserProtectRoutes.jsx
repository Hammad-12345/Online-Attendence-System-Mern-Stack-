import { createSlice } from "@reduxjs/toolkit";
export const UserProtectRoutes=createSlice(
    {
        name:"UserProtectDashboard",
        initialState:{
            UserProtectRouting:JSON.parse(localStorage.getItem('Token'))
        },
        reducers:{
            StoreData:(state,action)=>
            {
                 state.UserProtectRouting=action.payload
            },
            Falseuserroutes:(state)=>
            {
                state.UserProtectRouting=false
            }
        }
    }
)
export const { StoreData ,Falseuserroutes }=UserProtectRoutes.actions
export default UserProtectRoutes.reducer