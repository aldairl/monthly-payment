import { VITE_API_URL } from "../../../../../config/variables"
import { fetchData } from "../../../../../utils/fetch-request"
import { addBox, removeBox, setBoxBalance, setBoxes, setBoxPayments, setError, setLoading } from "./boxSlice"

export const getBoxes = (year = 2025) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = new URL(`${VITE_API_URL}/box?year=${year}`)

        try {
            const { body } = await fetchData(url)
            dispatch(setBoxes(body))
        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}


export const deleteBox = (boxId) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = new URL(`${VITE_API_URL}/box/${boxId}`)

        const options = {
            method: 'DELETE',
        }

        try {
            const { body, success } = await fetchData(url, options)
            if (!success) {
                dispatch(setError(body.error))
            }
            dispatch(removeBox(boxId))
        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const createBox = ({ name, description }) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/box`

        const body = {
            name,
            description
        }

        const options = {
            method: 'POST',
            body
        }

        try {
            const { body } = await fetchData(url, options)
            dispatch(addBox(body))
        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const getPaymentDetailsByBox = (boxId) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = new URL(`${VITE_API_URL}/box/details/${boxId}`)

        try {
            const { body, success } = await fetchData(url)

            if (!success) {
                return dispatch(setError(body.error))
            }
            dispatch(setBoxPayments(body))
        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const getBalanceByBox = (boxId) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = new URL(`${VITE_API_URL}/box/balance/${boxId}`)

        try {
            const { body, success } = await fetchData(url)

            if (!success) {
                return dispatch(setError(body.error))
            }
            dispatch(setBoxBalance(body))
        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}