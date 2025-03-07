import { useSelector } from "react-redux"
import { PaymentDetails } from "./PaymentDetails"

export const PaymentDetailsContainer = () => {

    const { boxPayments, totalBanance, loading, error } = useSelector(state => state.box)
    
    return (
        <PaymentDetails
            paymentList={boxPayments}
            totalBanance={totalBanance}
            loading={loading}
            error={error}
        />
    )
}
