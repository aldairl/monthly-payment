import { Route, Routes } from "react-router-dom"
import { GetUserContainer } from "../components/getUser/GetUserContainer"

export const UserRouter = () => {
    return (
        <Routes>
            <Route path="get-user" element={<GetUserContainer />} />
        </Routes>
    )
}
