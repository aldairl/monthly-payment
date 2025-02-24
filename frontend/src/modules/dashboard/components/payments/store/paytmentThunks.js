import { VITE_API_URL } from "../../../../../config/variables"
import { fetchData } from "../../../../../utils/fetch-request"
import { setError, setLoading, setPaymentCreated } from "./paymentSlice"

export const createPayment = ({ box, concepts, payer, type, amount }) => {
    return async (dispatch) => {

        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/payments`

        const body = {
            box,
            concepts,
            payer,
            type, 
            amount
        }

        const options = {
            method: 'POST',
            body
        }

        try {

            const { body, success } = await fetchData(url, options)

            if (!success) {
                throw new Error(body.error)
            }
            dispatch(setPaymentCreated(body))

        } catch (error) {
            console.log(":(", error)
            dispatch(setError(error.message || String(error)))
        }
        finally {
            dispatch(setLoading(false))
        }

    }
}