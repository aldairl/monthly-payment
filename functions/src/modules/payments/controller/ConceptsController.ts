import { Request, Response } from "express"
import { responses } from "../../../common/classes/Response"
import { AuthRequest } from "../../../common/interfaces/authRequest"
import { ConceptService } from "../services/ConceptService"

const conceptService = new ConceptService()

export class ConceptController {
    async getAllConcepts(req: Request, res: Response): Promise<void> {
        try {
            const concepts = await conceptService.getAllConcepts()
            responses.success(req, res, concepts)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createConcept(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { name, description } = req.body

            const newConcept = await conceptService.createConcept({ name, description })
            responses.success(req, res, newConcept)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async updateConcept(req: Request, res: Response): Promise<void> {
        try {
            const { name, description }  = req.body
            const updatedConcept = await conceptService.updateConcept(req.params.id, { name, description } )

            if (updatedConcept) {
                responses.success(req, res, updatedConcept)
            } else {
                responses.error(req, res, { message: "Concept not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async deleteConcept(req: Request, res: Response): Promise<void> {
        try {
            const success = await conceptService.deleteConcept(req.params.id)
            if (success) {
                responses.success(req, res, success)
            } else {
                responses.error(req, res, { message: "Concept not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}