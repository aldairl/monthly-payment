import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../modules/auth/store/authSlice";
import { dashSlice } from "../modules/dashboard/store/dashSlice";
import { paymentSlice } from "../modules/dashboard/components/payments/store/paymentSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        dash: dashSlice.reducer,
        payment: paymentSlice.reducer
    }
})