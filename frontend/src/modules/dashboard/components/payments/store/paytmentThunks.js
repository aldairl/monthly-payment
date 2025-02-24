import { VITE_API_URL } from "../../../../../config/variables"
import { fetchData } from "../../../../../utils/fetch-request"
import { setError, setLoading, setPaymentCreated } from "./paymentSlice"

export const createPayment = ({ box, concepts, payer, type }) => {
    return async (dispatch) => {

        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/payments`

        const body = {
            box,
            concepts,
            payer,
            type
        }

        const options = {
            method: 'POST',
            body
        }

        try {
            
            const { body } = await fetchData(url, options)
            dispatch( setPaymentCreated(body) )

        } catch (error) {
            dispatch( setError(error.message || String(error)) )
        }
        finally{
            dispatch( setLoading(true) )
        }

    }
}