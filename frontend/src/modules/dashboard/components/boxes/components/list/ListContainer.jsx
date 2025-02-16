import { useState } from 'react'
import { List } from './List'

export const ListContainer = () => {
  const boxes = [
    { _id: "123456", name: "caja enero", status: 'close', description: "Almaena los pagos de enero 2025", creation_date: '15-02-2025', close_date: '28-01-2025' },
    { _id: "12345678", name: "caja febrero", status: 'open', description: "Almaena los pagos de febrero 2025", creation_date: '15-02-2025', close_date: '' },
  ]

  const years = [2025, 2024]

  const [yearSelected, setYearSelected] = useState(new Date().getFullYear())

  const handlerCloseBox = () => {
    console.log('cerrar caja')
  }

  const handlerNewBox = () => {
    console.log('cerrar caja')
  }

  const handlerNewPayment = () => {
    console.log('Nuevo pago')
  }

  const handleChangeYearSelected = ({ target }) => {
    console.log('seleccionar año', target.value)
    setYearSelected(target.value)
  }

  return (
    <List
      boxes={boxes}
      handlerCloseBox={handlerCloseBox}
      handlerNewBox={handlerNewBox}
      handleChangeYearSelected={handleChangeYearSelected}
      yearSelected={yearSelected}
      handlerNewPayment={handlerNewPayment}
      years={years}
    />
  )
}
