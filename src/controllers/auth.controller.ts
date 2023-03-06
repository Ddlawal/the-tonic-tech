import { NextFunction, Request, Response } from 'express'

import { env, getCookieConfig, redisClient } from '../config'
import { UserCredentials, UserI } from '../interfaces/auth'
import { GenericResponse, RequestI } from '../interfaces/http'
import { AuthService } from '../services/auth.service'

export class AuthController {
    private AuthService: AuthService
    private oneMinute = 60 // one minute in seconds
    private oneHour = 60 * this.oneMinute // one hour in seconds

    constructor() {
        this.AuthService = new AuthService()
    }

    public signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: UserI = req.body
            const response = await this.AuthService.signup(userData)

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const userData: UserCredentials = req.body

        try {
            const response = await this.AuthService.login(userData)

            // set access token cookie
            const accessTokenOptions = getCookieConfig(this.oneMinute)
            res.cookie('access_token', response.data?.token, accessTokenOptions)

            // set refresh token cookie
            const refreshTokenOptions = getCookieConfig(this.oneHour)
            res.cookie('refresh_token', response.data?.refreshToken, refreshTokenOptions)

            if (env.dev.isLocal) res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public logout = async (req: RequestI, res: Response, next: NextFunction) => {
        try {
            const user = req.user

            await redisClient.del(`${user?._id}`)

            // clear cookies
            res.cookie('access_token', '', { maxAge: 1 })
            res.cookie('refresh_token', '', { maxAge: 1 })

            const response: GenericResponse = {
                message: 'Logged out sucessfully!',
                status: 'success',
            }

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get the refresh token from cookie
            const refresh_token = req.cookies.refresh_token as string

            const response = await this.AuthService.refreshAccessToken(refresh_token)

            // set access token cookie
            const accessTokenOptions = getCookieConfig(this.oneMinute)
            res.cookie('access_token', response.token, accessTokenOptions)

            if (env.dev.isLocal) res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}
