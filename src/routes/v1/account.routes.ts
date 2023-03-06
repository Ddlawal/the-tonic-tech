/* eslint-disable prettier/prettier */
import express, { Router } from 'express'
import { AccountController } from '../../controllers/account.controller'
import { Role } from '../../interfaces/auth.interface'
import { authenticate, authorize } from '../../middleware/auth.middleware'
import { validationMidlleware } from '../../middleware/validation.midlleware'

class Account {
    private AccountRouter: Router
    private AccountController: AccountController

    constructor() {
        this.AccountRouter = express.Router()
        this.AccountController = new AccountController()
    }

    public routes(): Router {
        this.AccountRouter.post(
            '/',
            authenticate,
            authorize(Role.CUSTOMER),
            ...validationMidlleware('createAccount'),
            this.AccountController.create
        )
        this.AccountRouter.get(
            '/',
            authenticate,
            authorize(Role.ADMIN, Role.TELLER),
            this.AccountController.getAllAccounts
        )
        this.AccountRouter.get('/:id', authenticate, this.AccountController.getUserAccountDetails)

        return this.AccountRouter
    }
}

export default Account
