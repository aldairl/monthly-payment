import { useEffect, useState } from 'react'
import { List } from './List'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBox, getBoxes, getPaymentDetailsByBox } from '../../store/thunks'
import { useNavigate } from 'react-router-dom'
import { setBox } from '../../../payments/store/paymentSlice'

export const ListContainer = () => {
  const { boxes, loading, error, years } = useSelector(state => state.box)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [boxLoaded, setBoxLoaded] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [boxToDelete, setBoxToDelete] = useState(null)

  const [yearSelected, setYearSelected] = useState('')

  const handlerCloseBox = () => {
    console.log('cerrar caja')
  }

  const handlerNewBox = () => {
    console.log('cerrar caja')
    navigate('/dash/box/create')
  }

  const handlerNewPayment = (boxId) => {
    dispatch(setBox(boxId))
    navigate('/dash/user/get-user')
  }

  const handleChangeYearSelected = ({ target }) => {
    setYearSelected(target.value)
    console.log('seleccionar año', target.value)
  }

  const viewBoxPayments = (boxId) => {
    dispatch(getPaymentDetailsByBox(boxId))
    navigate('/dash/box/details')
  }

  const viewBoxBalance = (boxId) => {
    navigate(`/dash/box/balance/${boxId}`)
  }

  const handleDeleteBox = (boxId, name) => {
    setDialogDelete(true)
    console.log('eliminar caja', boxId, name)
    setBoxToDelete({ boxId, name })
  }

  const handlerCancelDelete = () => {
    setDialogDelete(false)
    setBoxToDelete(null)
  }
  
  const handleConfirmBoxDelete = () => {
    console.log('confirmar eliminar caja')
    dispatch( deleteBox(boxToDelete.boxId) )
    setDialogDelete(false)
  }

  useEffect(() => {
    if (boxes.length === 0 && !boxLoaded) {
      dispatch(getBoxes(yearSelected))
      setBoxLoaded(true)
    }

  }, [yearSelected, boxes, dispatch, boxLoaded])


  return (
    <List
      boxes={boxes}
      handlerCloseBox={handlerCloseBox}
      handlerNewBox={handlerNewBox}
      handleChangeYearSelected={handleChangeYearSelected}
      yearSelected={yearSelected}
      handlerNewPayment={handlerNewPayment}
      years={years}
      loading={loading}
      error={error}
      viewBoxPayments={viewBoxPayments}
      dialogDelete={dialogDelete}
      handleDeleteBox={handleDeleteBox}
      handlerCancelDelete={handlerCancelDelete}
      boxToDelete={boxToDelete}
      handleConfirmBoxDelete={handleConfirmBoxDelete}
      viewBoxBalance={viewBoxBalance}
    />
  )
}
