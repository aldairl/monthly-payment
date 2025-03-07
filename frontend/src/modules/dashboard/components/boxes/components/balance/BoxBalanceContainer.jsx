import { useDispatch, useSelector } from 'react-redux'
import { BoxBalance } from "./BoxBalance"
import { useEffect } from 'react'
import { getBalanceByBox } from '../../store/thunks'
import { useParams } from 'react-router-dom'


export const BoxBalanceContainer = () => {

    const dispatch = useDispatch()
    const { boxId } = useParams()
    const { boxBalance, loading } = useSelector(state => state.box)

    useEffect(() => {

        dispatch(getBalanceByBox(boxId))

        return () => {

        }
    }, [dispatch, boxId])

    const totalExpense = boxBalance.expenses?.reduce((total, { totalAmount }) => total + totalAmount, 0)
    const totalIncome = boxBalance.incomes?.reduce((total, { totalAmount }) => total + totalAmount, 0)

    return (
        <BoxBalance
            boxBalance={boxBalance}
            loading={loading}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
        />
    )
}
