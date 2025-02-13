import { Routes, Route } from 'react-router-dom'
import { LoginContainer } from "../components/login/LoginContainer"

export const LoginRouter = () => {
    return (
        <Routes>
            <Route path='' element={<LoginContainer/>} />
        </Routes>
    )
}
