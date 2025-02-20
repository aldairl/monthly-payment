import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    conceptList: [],
    message: '',
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
        setMessage: (state, { payload }) => {
            state.message = payload
        },

        cleanDash: () => initialState,

        cleanDashVariables: (state) => {
            state.loading = false
            state.error = ''
            state.message = ''
        },

        setConceptList: (state, { payload }) => {
            state.conceptList = payload
            state.loading = false
            state.error = ''
        },

        addConceptList: (state, { payload }) => {
            state.conceptList = [...state.conceptList, payload]
            state.loading = false
            state.error = ''
            state.message = 'Concepto agregado correctamente'
        },
    }
})

export const { setLoading, setError, cleanDash, setConceptList, addConceptList, cleanDashVariables } = dashSlice.actions