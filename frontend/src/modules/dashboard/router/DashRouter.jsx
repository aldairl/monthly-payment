import { Navigate, Route, Routes } from "react-router-dom"
import { YearRouter } from "../years/router/YearRouter"
import { MainLayout } from "../../core/mainLayout/MainLayout"
import { RegisterPaymentContainer } from "../components/payments/components/RegisterPaymentContainer"

export const DashRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="register" element={<RegisterPaymentContainer />} />
                <Route path="years/*" element={<YearRouter />} />
                <Route path="*" element={<Navigate to='/dash/years/list' replace />} />
            </Route>
        </Routes>
    )
}