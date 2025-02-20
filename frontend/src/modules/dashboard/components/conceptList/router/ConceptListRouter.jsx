import { Route, Routes } from "react-router-dom"
import { CreateConceptContainer } from "../createConceptList/CreateConceptContainer"

export const ConceptListRouter = () => {
  return (
    <Routes>
        <Route path="create" element={ <CreateConceptContainer/> } />
    </Routes>
  )
}
