import { NextFunction, Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { UserI } from '../interfaces/auth.interface'
import { GenericResponse, QueryI, RequestI } from '../interfaces/http.interface'
import { UserService } from '../services/user.service'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const query = req.query as unknown as QueryI
            const response = await this.userService.getAllUsers(query)

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    public getUserDetails = async (req: RequestI, res: Response): Promise<void> => {
        const response: GenericResponse<HydratedDocument<UserI>> = {
            data: req.user,
            message: 'User details retrieved successfully',
            status: 'success',
        }

        res.status(201).json(response)
    }
}
