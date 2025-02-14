import { Navigate, Route, Routes } from "react-router-dom"
import { LoginRouter } from "../modules/auth/router/LoginRouter"
import { DashRouter } from "../modules/dashboard/router/DashRouter"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<LoginRouter />} />
            <Route path="/dash/*" element={<DashRouter />} />
            <Route path='*' element={ <Navigate to='/auth' replace /> } />
        </Routes>
    )
}
