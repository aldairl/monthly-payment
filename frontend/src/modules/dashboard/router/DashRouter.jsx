import { Navigate, Route, Routes } from "react-router-dom"
import { MainLayout } from "../../core/mainLayout/MainLayout"
import { BoxRouter } from "../components/boxes/router/BoxRouter"
import { UserRouter } from "../components/user/router/UserRouter"
import { ConceptListRouter } from "../components/conceptList/router/ConceptListRouter"

export const DashRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="box/*" element={<BoxRouter />} />
                <Route path="user/*" element={<UserRouter />} />
                <Route path="concepts/*" element={<ConceptListRouter />} />
                <Route path="*" element={<Navigate to='/dash/box/list' replace />} />
            </Route>
        </Routes>
    )
}