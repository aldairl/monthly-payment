import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    beneficiaries: [],
    beneficiarySelected: '',   
}

export const beneficiarySlice = createSlice({
    name: 'beneficiary',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setError: (state, { payload }) => {
            state.error = payload
        },
        clean: () => initialState,

        setBeneficiarySelected: (state, { payload }) => {
            state.beneficiarySelected = payload
        },
        setBeneficiaries: (state, { payload }) => {
            state.beneficiaries = payload
            state.error = ''
            state.loading = false
        }
    }
})

export const { setLoading, setError, clean, setBeneficiarySelected, setBeneficiaries } = beneficiarySlice.actions