import { useDispatch, useSelector } from 'react-redux'
import { BoxBalance } from "./BoxBalance"
import { useEffect, useState } from 'react'
import { getBalanceByBox } from '../../store/thunks'
import { useParams } from 'react-router-dom'


export const BoxBalanceContainer = () => {

    const dispatch = useDispatch()
    const { boxId } = useParams()
    const { boxBalance, loading } = useSelector(state => state.box)
    const [reportPaids, setReportPaids] = useState([])
    const [reportIncome, setReportIncome] = useState([])

    useEffect(() => {

        dispatch(getBalanceByBox(boxId))

        return () => {

        }
    }, [dispatch, boxId])

    const totalExpense = boxBalance.expenses?.reduce((total, { totalAmount }) => total + totalAmount, 0)
    const totalIncome = boxBalance.incomes?.reduce((total, { totalAmount }) => total + totalAmount, 0)

    // Calculate what incomes survives

    const getIncomesSurvices = (balances) => {
        // sort incomes by priority
        let incomes = balances.incomes.map(income => ({ ...income }))
        let expenses = balances.expenses.map( expese => ({...expese}) )
        
        incomes = incomes.sort((a, b) => a.priority - b.priority)
        expenses = expenses.sort((a, b) => a.totalAmount - b.totalAmount)

        const reportPaids = []

        for (const expense of expenses) {
            let currentExpense = expense.totalAmount

            for (let income of incomes) {

                // if arrive total expense go exit
                if (currentExpense <= 0) {
                    break
                }

                if (income.totalAmount > 0) {

                    if (income.totalAmount >= currentExpense) {
                        reportPaids.push(`El gasto ${expense._id} = ${currentExpense} se cubre con ${income._id}`)
                        income.totalAmount -= currentExpense
                        currentExpense = 0
                    }
                    else {
                        reportPaids.push(`Parte de ${expense._id} (${income.totalAmount}) se cubre con '${income._id}'`)
                        currentExpense -= income.totalAmount
                        expense.totalAmount -= income.totalAmount
                        income.totalAmount = 0
                    }
                }
            }
        }

        return [incomes, reportPaids]
    }

    useEffect(() => {

        if (boxBalance.incomes) {
            const [newIncomes, reportPaids] = getIncomesSurvices(boxBalance)
            setReportPaids(reportPaids)
            setReportIncome(newIncomes)
        }


    }, [boxBalance])


    return (
        <BoxBalance
            boxBalance={boxBalance}
            loading={loading}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            reportPaids={reportPaids}
            reportIncome={reportIncome}
        />
    )
}
