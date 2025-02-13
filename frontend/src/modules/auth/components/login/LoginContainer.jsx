import useMediaQuery from "@mui/material/useMediaQuery"
import * as yup from "yup"
import { Login } from './Login'


const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
})

const initialValues = {
    username: "",
    password: "",
}

export const LoginContainer = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
    }

    return (
        <Login
            isNonMobile={isNonMobile}
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            checkoutSchema={checkoutSchema}
        />
    )
}
