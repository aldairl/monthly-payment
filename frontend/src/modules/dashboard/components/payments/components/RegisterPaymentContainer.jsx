import { RegisterPayment } from "./RegisterPayment"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useSelector } from "react-redux"
import * as yup from "yup"


const checkoutSchema = yup.object().shape({
    payer: yup.string().required("required"),
    amount: yup.number().required("required"),
    box: yup.string().required("required"),
    type: yup.string().required("required"),
})

export const RegisterPaymentContainer = () => {

    const { payer, box, concepts } = useSelector(state => state.payment)

    const initialValues = {
        payer,
        amount: '',
        box,
        type: '',
        concepts
    }

    const isNonMobile = useMediaQuery("(min-width:600px)")
    const handleFormSubmit = (values) => {
        console.log(values)
        // dispatch(loginUser(username, password))
        // navigate('/dash/years')
    }

    return (
        <RegisterPayment

            isNonMobile={isNonMobile}
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            checkoutSchema={checkoutSchema}
        />
    )
}
