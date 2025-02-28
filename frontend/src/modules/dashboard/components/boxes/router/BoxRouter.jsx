import { Navigate, Route, Routes } from "react-router-dom"
import { ListContainer } from "../components/list/ListContainer"
import { RegisterPaymentContainer } from "../../payments/components/RegisterPaymentContainer"
import { CreateBoxContainer } from "../components/create/CreateBoxContainer"

export const BoxRouter = () => {
    return (
        <Routes>
            <Route path="list" element={<ListContainer />} />
            <Route path="new-payment" element={<RegisterPaymentContainer />} />      
            <Route path="create" element={<CreateBoxContainer />} />      
            <Route path="*" element={<Navigate to='/dash/box/list' />} />
        </Routes>
    )
}
