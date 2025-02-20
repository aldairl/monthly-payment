import { useDispatch, useSelector } from "react-redux"
import { GetUser } from "./GetUser"
import { getBeneficiaryByDNI } from "../../storage/beneficiaryThunks"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { setBeneficiarySelected } from "../../storage/beneficiarySlice"
import { setPayer } from "../../../payments/store/paymentSlice"

export const GetUserContainer = () => {

    const { beneficiaries, loading, error } = useSelector(state => state.beneficiary)
    const [identification, setIdentification] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSearch = (query) => {
        console.log(query)
        setIdentification(query)
        dispatch(getBeneficiaryByDNI(query))
    }

    const gotToAddNew = () => {
        navigate('/dash/user/add-new')
    }

    const selectBeneficiary = (beneficiary) => {
        dispatch(setBeneficiarySelected(beneficiary))
        dispatch( setPayer(beneficiary._id) )
        navigate('/dash/box/new-payment')
    }

    return (
        <GetUser
            onSearch={onSearch}
            beneficiaries={beneficiaries}
            identification={identification}
            loading={loading}
            error={error}
            gotToAddNew={gotToAddNew}
            selectBeneficiary={selectBeneficiary}
        />
    )
}
