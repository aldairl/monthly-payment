import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: ''
}

export const dashSlice = createSlice({
    name: 'dash',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setError: (state, { payload }) => {
            state.error = payload
        },
        clean: (state) => {
            state.loading = ''
            state.error = ''
        },
    }
})

export const {setLoading, setError, clean } = dashSlice.actions