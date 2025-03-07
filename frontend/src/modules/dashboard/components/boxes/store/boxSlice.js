import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    boxes: [],
    years: [],
    loading: false,
    error: '',
    message: '',
    boxPayments: [],
    boxBalance: {},
}

export const boxSlice = createSlice({
    name: 'box',
    initialState,
    reducers: {
        setBoxes: (state, { payload }) => {
            state.boxes = payload
            state.loading = false
            state.error = ''
            state.years = payload.map(box => new Date(box.creation_date).getFullYear())
        },
        setYears: (state, { payload }) => {
            state.years = payload
            state.loading = false
            state.error = ''
        },
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setError: (state, { payload }) => {
            state.error = payload
        },
        cleanBox: (state) => {
            state.boxes = []
            state.years = []
            state.loading = false
            state.error = ''
        },
        removeBox: (state, { payload }) => {
            state.loading = false
            state.error = ''
            state.boxes = state.boxes.filter(box => box._id !== payload)
        },
        cleanBoxVariables: (state) => {
            state.loading = false
            state.error = ''
            state.message = ''
        },
        addBox: (state, { payload }) => {
            state.boxes = [...state.boxes, payload]
            state.loading = false
            state.error = ''
            state.message = 'Caja agregada correctamente'
        },
        setBoxPayments: (state, { payload }) => {
            state.boxPayments = payload
            state.loading = false
            state.error = ''
        },
        setBoxBalance: (state, { payload }) => {
            state.boxBalance = payload
            state.loading = false
            state.error = ''
        },
    }
})

export const { setBoxes, setYears, setLoading, setError, cleanBox, removeBox, cleanBoxVariables, addBox, setBoxPayments, setBoxBalance } = boxSlice.actions