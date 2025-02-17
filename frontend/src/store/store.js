import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../modules/auth/store/authSlice";
import { dashSlice } from "../modules/dashboard/store/dashSlice";
import { paymentSlice } from "../modules/dashboard/components/payments/store/paymentSlice";
import { boxSlice } from "../modules/dashboard/components/boxes/store/boxSlice";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { beneficiarySlice } from "../modules/dashboard/components/user/storage/beneficiarySlice";

const persistAuthConfig = { key: "root", storage, }
const persistedAuthReducer = persistReducer(persistAuthConfig, authSlice.reducer)

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        dash: dashSlice.reducer,
        payment: paymentSlice.reducer,
        box: boxSlice.reducer,
        beneficiary: beneficiarySlice.reducer
    }
})

export const authPersistor = persistStore(store)