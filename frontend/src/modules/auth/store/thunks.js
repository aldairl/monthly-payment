import { VITE_API_URL } from "../../../config/variables"
import { fetchData } from "../../../utils/fetch-request"
import { login, setError, setLoading } from "./authSlice"

export const loginUser = (username, password) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/auth/login`

        const body = {
            username,
            password
        }

        const options = {
            method: 'POST',
            body
        }

        try {
            const { body } = await fetchData(url, options)
            // set toke in localstorage
            localStorage.setItem('authToken', body.token)
            dispatch(login(body))

        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}