import { useEffect, useState } from 'react'
import { List } from './List'
import { useDispatch, useSelector } from 'react-redux'
import { getBoxes } from '../../store/thunks'
import { useNavigate } from 'react-router-dom'

export const ListContainer = () => {
  const { boxes, loading, error, years } = useSelector(state => state.box)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ boxLoaded, setBoxLoaded ] = useState(false)

  const [yearSelected, setYearSelected] = useState(new Date().getFullYear())

  const handlerCloseBox = () => {
    console.log('cerrar caja')
  }

  const handlerNewBox = () => {
    console.log('cerrar caja')
  }

  const handlerNewPayment = () => {
    navigate('/dash/box/new-payment')
  }

  const handleChangeYearSelected = ({ target }) => {
    setYearSelected(target.value)
    console.log('seleccionar año', target.value)
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
    />
  )
}
