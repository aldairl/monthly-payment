import { useDispatch, useSelector } from 'react-redux'
import { AddUser } from './AddUser'
import * as yup from "yup"
import { addBeneficiary } from '../../storage/beneficiaryThunks'
import { useNavigate } from 'react-router-dom'
import { setPayer } from '../../../payments/store/paymentSlice'

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  lastname: yup.string(),
  identification: yup.string().required("required"),
  birthday: yup.date(),
  temple: yup.string().required("required"),
  cellphone: yup.string().required("required"),
})

const initialValues = {
  name: '',
  lastname: '',
  identification: '',
  birthday: '',
  temple: '',
  cellphone: '',
}

export const AddUserContainer = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, beneficiarySelected } = useSelector(state => state.beneficiary)

  const handleFormSubmit = (values) => {
    console.log(values)
    dispatch(addBeneficiary(values))
  }

  const goToAddPayment = () => {
    dispatch( setPayer(beneficiarySelected._id) )
    navigate('/dash/box/new-payment')
  }

  return (
    <AddUser
      checkoutSchema={checkoutSchema}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
      loading={loading}
      error={error}
      beneficiarySelected={beneficiarySelected}
      goToAddPayment={goToAddPayment}
    />
  )
}
