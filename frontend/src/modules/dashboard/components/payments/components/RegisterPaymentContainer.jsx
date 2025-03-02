import { RegisterPayment } from "./RegisterPayment"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { MONTHS, YEARS } from "../utils/months"
import { useEffect, useState } from "react"
import { getConceptList } from "../../../store/dashThunks"
import { clean } from "../store/paymentSlice"
import { useNavigate } from "react-router-dom"
import { createPayment } from "../store/paytmentThunks"


const checkoutSchema = yup.object().shape({
    payer: yup.string().required("required"),
    // amount: yup.number().required("required"),
    box: yup.string().required("required"),
    type: yup.string().required("required"),
})

export const RegisterPaymentContainer = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { payer, box, loading, paymentCreated } = useSelector(state => state.payment)
    const { beneficiarySelected } = useSelector(state => state.beneficiary)
    const { conceptList } = useSelector(state => state.dash)
    const { boxes } = useSelector(state => state.box)
    const [openDialog, setOpenDialog] = useState(false)

    const initialValues = {
        payer,
        box,
        type: 'income',
        concepts: []
    }

    const handleFormSubmit = (values) => {
        console.log(values)
        const amount = values.concepts.reduce((total, current) => total + current.amount, 0)
        const newPayment = { ...values, amount }
        dispatch(createPayment(newPayment))
    }

    const handleCloseDialog = () => {
        console.log(paymentCreated)
        setOpenDialog(false)
    }

    const handleNewPayment = () => {
        dispatch(clean())
        navigate('/dash/user/get-user')
    }

    useEffect(() => {
        if (!conceptList.length) {
            dispatch(getConceptList())
        }

    }, [dispatch, conceptList])

    useEffect(() => {
        if (paymentCreated) {
            setOpenDialog(true)
        }

    }, [paymentCreated])

    useEffect(() => {
        if (!payer) {
            navigate('/dash/user/get-user')
        }

    }, [payer, navigate])

    return (
        <RegisterPayment
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            checkoutSchema={checkoutSchema}
            conceptList={conceptList}
            months={MONTHS}
            years={YEARS()}
            boxes={boxes}
            beneficiarySelected={beneficiarySelected}
            loading={loading}
            paymentCreated={paymentCreated}
            handleClose={handleCloseDialog}
            openDialog={openDialog}
            handleNewPayment={handleNewPayment}
        />
    )
}
