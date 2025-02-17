import { Router } from "express"
import { authenticateJWT } from "../../../common/middlewares/Auth"
import { BeneficiaryController } from "../controllers/BeneficiaryController"

const beneficiaryRouter = Router()
const beneficiaryController = new BeneficiaryController()

beneficiaryRouter.get("/", authenticateJWT, beneficiaryController.getAllBeneficiarities)
beneficiaryRouter.get("/:id", authenticateJWT, beneficiaryController.getBeneficiaryById)
beneficiaryRouter.get("/get-by-dni/:id", authenticateJWT, beneficiaryController.getBeneficiaryByDNI)
beneficiaryRouter.post("/", authenticateJWT, beneficiaryController.createBeneficiary)
beneficiaryRouter.put("/:id", authenticateJWT, beneficiaryController.updateBeneficiary)
beneficiaryRouter.delete("/:id", authenticateJWT, beneficiaryController.deleteBeneficiary)

export default beneficiaryRouter