import { NextFunction, Request, Response } from 'express'
import { QueryI } from '../interfaces/http'
import { UserService } from '../services/user.service'

export class UserController {
    private UserService: UserService

    constructor() {
        this.UserService = new UserService()
    }

    public getAllusers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const query = req.query as unknown as QueryI
            const response = await this.UserService.getAllusers(query)

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }
}
