import { Router } from "express"
import { authenticateJWT } from "../../../common/middlewares/Auth"
import { ConceptController } from "../controller/ConceptsController"

const conceptController = new ConceptController()
const conceptsRouter = Router()

conceptsRouter.get('/', authenticateJWT, conceptController.getAllConcepts)
conceptsRouter.post("/", authenticateJWT, conceptController.createConcept)
conceptsRouter.put("/:id", authenticateJWT, conceptController.updateConcept)
conceptsRouter.delete("/:id", authenticateJWT, conceptController.deleteConcept)

export default conceptsRouter