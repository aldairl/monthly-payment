import { useDispatch } from "react-redux"
import { GetUser } from "./GetUser"
import { searchUser } from "../../storage/userThunks"

export const GetUserContainer = () => {

    const dispatch = useDispatch()

    const onSearch = (query) => {
        console.log(query)
        if (typeof query !== 'number') {
            return
        }
        
        dispatch(searchUser(query))
    }

    return (
        <GetUser
            onSearch={onSearch}
        />
    )
}
