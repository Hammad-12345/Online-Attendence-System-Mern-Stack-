import { createSlice } from "@reduxjs/toolkit";
const UserProfileimage=""
export const UserProfileImageReducer=createSlice(
    {
        name:"UserProtectDashboard",
        initialState:UserProfileimage,
        reducers:{
            StoreImage:(state,action)=>
            {
                return state=action.payload
            },
        
        }
    }
)
export const { StoreImage}=UserProfileImageReducer.actions
export default UserProfileImageReducer.reducer