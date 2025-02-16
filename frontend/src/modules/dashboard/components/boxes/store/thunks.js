import { VITE_API_URL } from "../../../../../config/variables"
import { fetchData } from "../../../../../utils/fetch-request"
import { setBoxes, setError, setLoading } from "./boxSlice"

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