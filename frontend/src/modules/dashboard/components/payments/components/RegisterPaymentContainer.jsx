import { RegisterPayment } from "./RegisterPayment"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { MONTHS } from "../utils/months"
import { useEffect } from "react"
import { getConceptList } from "../../../store/dashThunks"


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
    const { conceptList } = useSelector(state => state.dash)
    const { boxes } = useSelector(state => state.box)

    const initialValues = {
        payer,
        box,
        type: 'income',
        concepts: []
    }

    const handleFormSubmit = (values) => {
        console.log(values)
        dispatch(  )
    }

    useEffect(() => {
        if (!conceptList.length) {
            dispatch(getConceptList())
        }

    }, [dispatch, conceptList])

    return (
        <RegisterPayment
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
