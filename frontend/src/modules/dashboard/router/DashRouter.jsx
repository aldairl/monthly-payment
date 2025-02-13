import { Navigate, Route, Routes } from "react-router-dom"
import { YearRouter } from "../years/router/YearRouter"
// import { MainLayoutContainer } from "../../core/components/mainLayout/MainLayoutContainer"

export const DashRouter = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<MainLayoutContainer />}> */}
            <Route path="years/*" element={<YearRouter />} />
            <Route path="*" element={<Navigate to='/dash/years/list' replace />} />
            {/* </Route> */}
        </Routes>
    )
}