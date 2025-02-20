import { RegisterPayment } from "./RegisterPayment"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { MONTHS } from "../utils/months"


const checkoutSchema = yup.object().shape({
    payer: yup.string().required("required"),
    // amount: yup.number().required("required"),
    box: yup.string().required("required"),
    type: yup.string().required("required"),
})

export const RegisterPaymentContainer = () => {

    const dispatch = useDispatch()
    const { payer, box, loading } = useSelector(state => state.payment)
    const { beneficiarySelected } = useSelector(state => state.beneficiary)
    const { boxes } = useSelector(state => state.box)

    const initialValues = {
        payer,
        box,
        type: 'income',
        concepts: []
    }

    const conceptList = [
        { _id: 'zxc', name: 'Arriendo', description: '' },
        { _id: 'zxcv', name: 'Flores', description: '' },
    ]

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
    }

    return (
        <RegisterPayment
            isNonMobile={isNonMobile}
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            checkoutSchema={checkoutSchema}
            conceptList={conceptList}
            months={MONTHS}
            boxes={boxes}
            beneficiarySelected={beneficiarySelected}
            loading={loading}
        />
    )
}
