import { Router } from "express"
import { ExpenseController } from '../controller/ExpensesController'
import { authenticateJWT } from "../../../common/middlewares/Auth"


const expenseController = new ExpenseController()
const expensesRouter = Router()

expensesRouter.get("/", authenticateJWT, expenseController.getAllExpenses)
expensesRouter.post("/", authenticateJWT, expenseController.createExpense)

export default expensesRouter