import { useDispatch, useSelector } from "react-redux"
import { GetUser } from "./GetUser"
import { getBeneficiaryByDNI } from "../../storage/beneficiaryThunks"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { setBeneficiarySelected } from "../../storage/beneficiarySlice"
import { useEffect } from "react"

export const GetUserContainer = () => {

    const { beneficiaries, loading, error, beneficiarySelected } = useSelector(state => state.beneficiary)
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

    const selectBeneficiary = (id) => {
        dispatch(setBeneficiarySelected(id))
    }

    useEffect(() => {
        if (beneficiarySelected) {
            navigate('/dash/box/new-payment')
        }
    }, [beneficiarySelected, navigate])

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
