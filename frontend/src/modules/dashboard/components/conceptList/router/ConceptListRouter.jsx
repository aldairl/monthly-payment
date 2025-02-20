import { Route, Routes } from "react-router-dom"
import { CreateConceptContainer } from "../createConceptList/CreateConceptContainer"
import { ShowConceptsContainer } from "../showConceptList/ShowConceptsContainer"

export const ConceptListRouter = () => {
  return (
    <Routes>
        <Route path="create" element={ <CreateConceptContainer/> } />
        <Route path="list" element={ <ShowConceptsContainer/> } />
    </Routes>
  )
}
