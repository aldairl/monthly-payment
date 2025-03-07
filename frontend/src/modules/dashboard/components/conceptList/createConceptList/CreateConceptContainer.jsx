import { useDispatch, useSelector } from "react-redux"
import { CreateConcept } from "./CreateConcept"
import * as yup from "yup"
import { createConceptList } from "../../../store/dashThunks"
import { useEffect, useState } from "react"
import { cleanDashVariables } from "../../../store/dashSlice"


const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string(),
    priority: yup.number()
})

const initialValues = {
    name: '',
    description: '',
    priority: 1
}

export const CreateConceptContainer = () => {

    const dispatch = useDispatch()
    const [ resetFormAction, setResetFormAction ] = useState()
    const { loading, error, message } = useSelector(state => state.dash)

    const handleFormSubmit = (values, resetForm) => {
        dispatch(createConceptList(values))

        if(!resetFormAction){
            setResetFormAction(resetForm)
        }
    }

    const onFocus = () => {
        console.log()
        dispatch(cleanDashVariables())
    }

    useEffect(() => {
        return () => {
            dispatch(cleanDashVariables())
        }
    }, [dispatch])

    useEffect(() => {
      if(message && resetFormAction){
        resetFormAction()
      }
    
    }, [message, resetFormAction])
    


    return (
        <CreateConcept
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
