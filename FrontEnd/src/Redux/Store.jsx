import { configureStore } from '@reduxjs/toolkit'
import UserRoutes from './UserRoutesReducer/UserProtectRoutes'
import UserProfileImage from './UserRoutesReducer/UserProfileImageReduceer'
import AdminProtectRoutes from './AdminRoutesReducer/AdminProtectRoutes'
export const Store=configureStore({
    reducer:{
        UserProtect:UserRoutes,
        UserProfileImagepath:UserProfileImage,
        AdminProtect:AdminProtectRoutes
    }
})