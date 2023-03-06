import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import { AccountI } from '../interfaces/account.interface'

import { QueryI, RequestI } from '../interfaces/http.interface'
import { AccountService } from '../services/account.service'

export class AccountController {
    private accountService: AccountService

    constructor() {
        this.accountService = new AccountService()
    }

    public create = async (req: RequestI, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: Omit<AccountI, 'accountNo'> = req.body
            const response = await this.accountService.create(userData, req.user?._id as Types.ObjectId)

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    public getAllAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const query = req.query as unknown as QueryI
            const response = await this.accountService.getAllAccounts(query)

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    public getUserAccountDetails = async (req: RequestI, res: Response, next: NextFunction): Promise<void> => {
        try {
            const accountId = req.params.id as unknown as Types.ObjectId
            const response = await this.accountService.getUserAccountById(accountId)

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}
