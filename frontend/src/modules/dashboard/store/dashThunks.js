import { VITE_API_URL } from "../../../config/variables"
import { fetchData } from "../../../utils/fetch-request"
import { addConceptList, setConceptList, setError, setLoading } from "./dashSlice"

export const getConceptList = () => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/concepts`

        try {
            const { body } = await fetchData(url)
            dispatch(setConceptList(body))

        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const createConceptList = ({ name, description }) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/concepts`

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
            dispatch(addConceptList(body))
        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}