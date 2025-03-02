import { VITE_API_URL } from "../../../../../config/variables"
import { fetchData } from "../../../../../utils/fetch-request"
import { setBeneficiaries, setBeneficiarySelected, setError, setLoading,  } from "./beneficiarySlice"

export const getBeneficiaryByDNI = (identification) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/beneficiaries/get-by-search/${identification}`

        try {
            const { body } = await fetchData(url)
            // set toke in localstorage
            dispatch(setBeneficiaries(body))

        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const getLastBeneficiaryPayment = (search) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        
        const url = `${VITE_API_URL}/beneficiaries/last/${search}`
        
        try {
            const { body, success } = await fetchData(url)
            
            if(!success){
                return dispatch(setError(body.error))
            }
            
            // const { payer, box, creation_date, concepts} = body[0]

            // const conceptString =  concepts.map( ({ month, details, amount }) => `concepto: ${details.name}, ${month}, valor: ${amount}` ).join('\n')

            // const beneficiaryLastPaymentInfo = [{ ...payer, lastPayment: creation_date, concepts: conceptString, box: box.name }]

            dispatch(setBeneficiaries(body))

        } catch (error) {
            console.log(error)
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const addBeneficiary = ({ name, lastname, identification, birthdate, temple, cellphone }) => {
    return async (dispatch) => {
        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/beneficiaries`

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
            dispatch(setBeneficiarySelected(body))

        } catch (error) {
            dispatch(setError(error.message || String(error)))
        } finally {
            dispatch(setLoading(false))
        }
    }
}