import { Navigate, Route, Routes } from "react-router-dom"
import { ListContainer } from "../components/list/ListContainer"

export const BoxRouter = () => {
    return (
        <Routes>
            <Route path="list" element={<ListContainer />} />
            
            <Route path="*" element={<Navigate to='/dash/box/list' />} />
        </Routes>
    )
}
