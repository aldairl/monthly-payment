import { VITE_API_URL } from "../../../../../config/variables"
import { fetchData } from "../../../../../utils/fetch-request"
import { setError, setLoading, setUsers, setUserSelected } from "./userSlice"

export const searchUser = (identification) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/users/search`

        const body = {
            identification
        }

        const options = {
            method: 'POST',
            body
        }

        try {
            const { body } = await fetchData(url, options)
            // set toke in localstorage
            dispatch(setUsers(body))

        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const addUser = ({ name, lastname, identification, birthdate, temple, cellphone }) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/users/create`

        const body = {
            name,
            lastname,
            identification,
            birthdate,
            temple,
            cellphone
        }

        const options = {
            method: 'POST',
            body
        }

        try {
            const { body } = await fetchData(url, options)
            dispatch(setUserSelected(body))

        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}