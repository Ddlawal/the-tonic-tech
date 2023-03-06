import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ValidationPath } from '../interfaces/validation'
import { logger } from '../utils/logger'
import { auth } from './validators'

const handleValidationError = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(({ location, msg, param, value }) => {
        return {
            field: param,
            location,
            message: msg,
            value: value,
        }
    })

    if (!errors.isEmpty()) {
        logger.error(errors)
        return res.status(req.statusCode ? req.statusCode : 400).json({ errors: errors.array() })
    }

    return next()
}

export const validationMidlleware = (path: ValidationPath) => {
    switch (path) {
        case 'signup':
            return [...auth.signupValidator, handleValidationError]

        default:
            return [handleValidationError]
    }
}
