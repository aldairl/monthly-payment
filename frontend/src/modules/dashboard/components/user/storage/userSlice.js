import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    users: [],
    userSelected: '',   
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setError: (state, { payload }) => {
            state.error = payload
        },
        clean: () => initialState,
        setUserSelected: (state, { payload }) => {
            state.userSelected = payload
        },
        setUsers: (state, { payload }) => {
            state.users = payload
            state.error = ''
            state.loading = false
        }
    }
})

export const { setLoading, setError, clean, setUserSelected, setUsers } = userSlice.actions