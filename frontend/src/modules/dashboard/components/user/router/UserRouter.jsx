import { Route, Routes } from "react-router-dom"
import { GetUserContainer } from "../components/getUser/GetUserContainer"
import { AddUserContainer } from "../components/addUser/addUserContainer"

export const UserRouter = () => {
    return (
        <Routes>
            <Route path="get-user" element={<GetUserContainer />} />
            <Route path="add-new" element={<AddUserContainer />} />
        </Routes>
    )
}
