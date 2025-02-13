import { Navigate, Route, Routes } from "react-router-dom"
import { LoginRouter } from "../modules/auth/router/LoginRouter"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<LoginRouter />} />

            <Route path='*' element={ <Navigate to='/auth' replace /> } />
        </Routes>
    )
}
