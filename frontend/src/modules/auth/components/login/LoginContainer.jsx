import useMediaQuery from "@mui/material/useMediaQuery"
import * as yup from "yup"
import { Login } from './Login'
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../store/thunks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../store/authSlice"


const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
})

const initialValues = {
    username: "",
    password: "",
}

export const LoginContainer = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { username, token, error, loading } = useSelector(state => state.auth)

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = ({ username, password }) => {
        dispatch( logout() )
        // console.log({ username, password })
        dispatch(loginUser(username, password))
        // navigate('/dash/years')
    }

    useEffect(() => {
        if (token && username) {
            navigate('/dash/years')
        }
    }, [token, username, navigate])

    return (
        <Login
            isNonMobile={isNonMobile}
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            checkoutSchema={checkoutSchema}
            error={error}
            loading={loading}
        />
    )
}
