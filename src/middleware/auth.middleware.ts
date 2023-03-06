import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import { UserService } from '../services/user.service'
import { getAuthByToken } from '../utils/auth'
import { env, redisClient } from '../config'
import { HttpException } from './errors.middleware'
import { RequestI } from '../interfaces/http'
import { RoleI } from '../interfaces/auth'

export const validateToken = async (access_token: string, secret = env.server.jwtSecret) => {
    if (!access_token) {
        throw new HttpException(httpStatus.UNAUTHORIZED, 'Error! Unauthorized')
    }

    // Validate Access Token
    const decoded = await getAuthByToken(access_token, secret)

    if (!decoded) {
        throw new HttpException(httpStatus.UNAUTHORIZED, 'Error! Unauthorized')
    }

    // Check if user has a valid session
    const session = await redisClient.get(`${decoded.uid}`)

    if (!session) {
        throw new HttpException(httpStatus.UNAUTHORIZED, 'Error! User session has expired')
    }

    // Check if user still exist
    const user = await new UserService().findUser(JSON.parse(session).uid)

    if (!user) {
        throw new HttpException(httpStatus.UNAUTHORIZED, 'Error! Unauthorized')
    }

    return user
}

export const authenticate = async (req: Request, _: Response, next: NextFunction) => {
    try {
        // Get the token
        const access_token = req.cookies.access_token

        const user = await validateToken(access_token)

        // This is really important (Helps us know if the user is logged in from other controllers)
        // You can do: (req.user or res.locals.user)
        ;(req as RequestI).user = user

        return next()
    } catch (error) {
        next(error)
    }
}

export const authorize =
    (...allowedRoles: Array<RoleI>) =>
    (req: RequestI, _: Response, next: NextFunction) => {
        const user = req.user
        if (!user?.role || !allowedRoles.includes(user.role)) {
            throw new HttpException(httpStatus.FORBIDDEN, 'You are not allowed to perform this action')
        }

        next()
    }
