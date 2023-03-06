import { NextFunction, Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from 'http-status'
import { GenericResponse } from '../interfaces/http'

import { logger } from '../utils/logger'

export class HttpException extends Error {
    public status: number
    public message: string

    constructor(status: number, message?: string) {
        super(message)
        this.status = status
        this.message = message || 'Something went wrong'
    }
}

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || INTERNAL_SERVER_ERROR
        const message: string = error.message

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)

        const response: GenericResponse = { error, message, status: 'error' }

        res.status(status).json(response)
    } catch (error) {
        next(error)
    }
}
