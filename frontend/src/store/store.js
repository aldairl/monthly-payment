import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../modules/auth/store/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})