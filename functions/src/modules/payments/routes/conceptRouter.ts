import { Router } from "express"
import { authenticateJWT, checkIsAdmin } from "../../../common/middlewares/Auth"
import { ConceptController } from "../controller/ConceptsController"

const conceptController = new ConceptController()
const conceptsRouter = Router()

conceptsRouter.get('/', authenticateJWT, conceptController.getAllConcepts)
conceptsRouter.post("/", authenticateJWT, checkIsAdmin, conceptController.createConcept)
conceptsRouter.put("/:id", authenticateJWT, checkIsAdmin, conceptController.updateConcept)
conceptsRouter.delete("/:id", authenticateJWT, checkIsAdmin, conceptController.deleteConcept)

export default conceptsRouter