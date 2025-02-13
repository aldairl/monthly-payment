import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    token: '',
    username: '',
    loading: false,
    error: ''
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.token = payload.token
            state.user = payload.user ?? ''
            state.username = payload.username
            state.loading = false
            state.error = ''
        },
        logout: (state) => {
            state.token = ''
            state.user = ''
            state.username = ''
            state.loading = false
            state.error = ''
        },
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setError: (state, { payload }) => {
            state.error = payload
        },
    }
})

export const { login, setLoading, setError, logout } = authSlice.actions