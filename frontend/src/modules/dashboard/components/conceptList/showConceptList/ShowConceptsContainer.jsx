import { useDispatch, useSelector } from "react-redux"
import { ShowConcepts } from "./ShowConcepts"
import { useEffect } from "react"
import { getConceptList } from "../../../store/dashThunks"

export const ShowConceptsContainer = () => {

    const dispatch = useDispatch()
    const { loading, conceptList } = useSelector(state => state.dash)

    useEffect(() => {
        if(!conceptList.length){
            dispatch(getConceptList())
        }

    }, [dispatch, conceptList])

    return (
        <ShowConcepts
            loading={loading}
            conceptList={conceptList}
        />
    )
}
