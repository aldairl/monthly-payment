import { Router } from "express"
import { ExpenseController } from '../controller/ExpensesController'
import { authenticateJWT, checkIsAdmin } from "../../../common/middlewares/Auth"


const expenseController = new ExpenseController()
const expensesRouter = Router()

expensesRouter.get("/", authenticateJWT, expenseController.getAllExpenses)
expensesRouter.post("/", authenticateJWT, checkIsAdmin, expenseController.createExpense)

export default expensesRouter