import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Create } from "./Create"
import * as yup from "yup"
import { cleanBoxVariables } from "../../store/boxSlice"
import { createBox } from "../../store/thunks"

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string(),
})

const initialValues = {
    name: '',
    description: '',
}

export const CreateBoxContainer = () => {

    const dispatch = useDispatch()
    const [resetFormAction, setResetFormAction] = useState()
    const { loading, error, message } = useSelector(state => state.box)


    const handleFormSubmit = (values, resetForm) => {
        dispatch(createBox(values))

        if (!resetFormAction) {
            setResetFormAction(resetForm)
        }

    }

    const onFocus = () => {
        console.log()
        dispatch(cleanBoxVariables())
    }

    useEffect(() => {
        return () => {
            dispatch(cleanBoxVariables())
        }
    }, [dispatch])

    useEffect(() => {
        if (message && resetFormAction) {
            resetFormAction()
        }

    }, [message, resetFormAction])

    return (
        <Create
            checkoutSchema={checkoutSchema}
            initialValues={initialValues}
            handleFormSubmit={handleFormSubmit}
            loading={loading}
            error={error}
            message={message}
            onFocus={onFocus}
        />
    )
}
