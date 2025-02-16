import { RegisterPayment } from "./RegisterPayment"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { addConcept } from "../store/paymentSlice"


const checkoutSchema = yup.object().shape({
    payer: yup.string().required("required"),
    amount: yup.number().required("required"),
    box: yup.string().required("required"),
    type: yup.string().required("required"),
})

const conceptsCheckoutSchema = yup.object().shape({
    concept_id: yup.string().required("required"),
    amount: yup.number().required("required"),
    month_id: yup.string().required("required"),
})

export const RegisterPaymentContainer = () => {

    const dispatch = useDispatch()
    const { payer, box, concepts } = useSelector(state => state.payment)
    const { boxes } = useSelector(state => state.box)

    const initialValues = {
        payer,
        amount: '',
        box,
        type: 'income',
        concepts
    }

    const conceptInitialValues = {
        concept_id: '',
        amount: '',
        month_id: ''
    }

    const months = [
        { _id: "asdf", name: 'enero', year: 2025, month: 1, description: '' },
        { _id: "asdfg", name: 'febrero', year: 2025, month: 2, description: '' },
    ]

    const conceptList = [
        { _id: 'zxc', name: 'Arriendo', description: '' },
        { _id: 'zxcv', name: 'Flores', description: '' },
    ]

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
        // dispatch(loginUser(username, password))
        // navigate('/dash/years')
    }

    const handleConceptsSubmit = (values) => {
        console.log(values)
        dispatch(addConcept(values))
    }

    return (
        <RegisterPayment
            isNonMobile={isNonMobile}
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            checkoutSchema={checkoutSchema}
            handleConceptsSubmit={handleConceptsSubmit}
            conceptInitialValues={conceptInitialValues}
            conceptsCheckoutSchema={conceptsCheckoutSchema}
            conceptList={conceptList}
            months={months}
            boxes={boxes}
        />
    )
}
