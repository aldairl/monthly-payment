import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payer: '',
    amount: '',
    box: '',
    type: '',
    concepts: [], //{concept_id, amount, month_id}
    loading: false,
    error: '',
    paymentCreated: null
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setError: (state, { payload }) => {
            state.error = payload
            state.loading = false
        },
        setPayer: (state, { payload }) => {
            state.payer = payload
        },
        setBox: (state, { payload }) => {
            state.box = payload
        },
        setType: (state, { payload }) => {
            state.box = payload
        },
        addConcept: (state, { payload }) => {
            state.concepts = [...state.concepts, payload]
        },
        removeItem: (state, { payload }) => {
            state.concepts = state.concepts.filter((item, index) => index !== payload);
        },
        clean: () => initialState,

        setPaymentCreated: (state, { payload }) => {
            state.paymentCreated = payload
            state.loading=false
            state.error=''
        },
    }
})

export const { setLoading, setError, setPayer, setBox, setType, addConcept, clean, removeItem, setPaymentCreated } = paymentSlice.actions