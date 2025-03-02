import { Request, Response } from "express"
import { responses } from "../../../common/classes/Response";
import { BeneficiaryService } from "../services/BeneficiaryService";

const beneficiaryService = new BeneficiaryService()

export class BeneficiaryController {
    async getAllBeneficiarities(req: Request, res: Response): Promise<void> {
        try {
            const beneficiarities = await beneficiaryService.getAllBeneficiaries()
            responses.success(req, res, beneficiarities)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async getBeneficiaryById(req: Request, res: Response): Promise<void> {
        try {
            const beneficiary = await beneficiaryService.getBeneficiaryById(req.params.id)
            if (beneficiary) {
                responses.success(req, res, beneficiary)
            } else {
                responses.error(req, res, { message: "Beneficiary not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async getBeneficiaryByDNI(req: Request, res: Response): Promise<void> {
        try {
            const beneficiary = await beneficiaryService.getBeneficiaryByDNI(req.params.id)
            if (beneficiary) {
                responses.success(req, res, beneficiary)
            } else {
                responses.error(req, res, { message: "Beneficiary not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async createBeneficiary(req: Request, res: Response): Promise<void> {
        try {
            const { name, lastname, identification, birthdate, temple, cellphone } = req.body
            const newBeneficiary = await beneficiaryService.createBeneficiary({ name, lastname, identification, birthdate, temple, cellphone })
            responses.success(req, res, newBeneficiary)
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async updateBeneficiary(req: Request, res: Response): Promise<void> {
        try {
            const { name, lastname, identification, birthdate, temple, cellphone } = req.body
            const updatedBenediciary = await beneficiaryService.updateBeneficiary(req.params.id, { name, lastname, identification, birthdate, temple, cellphone })

            if (updatedBenediciary) {
                responses.success(req, res, updatedBenediciary)
            } else {
                responses.error(req, res, { message: "Beneficiary not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async deleteBeneficiary(req: Request, res: Response): Promise<void> {
        try {
            const success = await beneficiaryService.deleteBeneficiary(req.params.id)
            if (success) {
                responses.success(req, res, success)
            } else {
                responses.error(req, res, { message: "Beneficiary not found" })
            }
        } catch (error) {
            responses.error(req, res, error)
        }
    }

    async getBeneficiaryAndLastPaymnet(req: Request, res: Response): Promise<void> {
        try {
            const beneficiary = await beneficiaryService.getBeneficiaryandLastPayment(req.params.cc)
            responses.success(req, res, beneficiary)
        } catch (error) {
            responses.error(req, res, error)
        }
    }
}