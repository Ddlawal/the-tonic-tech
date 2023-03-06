import httpStatus from 'http-status'
import { Model } from 'mongoose'
import { env } from '../config'

import { LoginResponse, SignupResponse, UserCredentials, UserI } from '../interfaces/auth.interface'
import { GenericResponse } from '../interfaces/http.interface'
import { validateToken } from '../middleware/auth.middleware'
import { HttpException } from '../middleware/errors.middleware'
import { User } from '../schema'
import { comparePassword, generateToken, hashPassword } from '../utils/auth'

export class AuthService {
    private userModel: Model<UserI>

    constructor() {
        this.userModel = User
    }

    public signup = async (userData: UserI): Promise<GenericResponse<Omit<UserI, 'password'>>> => {
        const userExists = await this.userModel.findOne({ email: userData.email })

        if (userExists) {
            throw new HttpException(httpStatus.CONFLICT, 'User already exists')
        }

        const hashedPassword = await hashPassword(userData.password)

        const user: SignupResponse = await this.userModel.create({
            ...userData,
            password: hashedPassword,
        })

        user.password = undefined

        return {
            data: user,
            message: 'Signup successful',
            status: 'success',
        }
    }

    public login = async ({ email, password }: UserCredentials): Promise<GenericResponse<LoginResponse>> => {
        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new HttpException(httpStatus.NOT_FOUND, 'User not found')
        }

        // check if password is correct
        const validPassword = await comparePassword(password, user.password)

        if (!validPassword) {
            throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid credentials')
        }

        const iat = Math.floor(Date.now() / 1000)

        const token = await generateToken({ uid: user._id, iat })
        const refreshToken = await generateToken({ uid: user._id, iat }, env.server.jwtRefreshSecret)

        const data: LoginResponse = {
            refreshToken,
            token,
        }

        return {
            data,
            message: 'Login successful',
            status: 'success',
        }
    }

    public refreshAccessToken = async (refreshToken: string) => {
        // Validate the Refresh token
        const user = await validateToken(refreshToken, env.server.jwtRefreshSecret)

        const iat = Math.floor(Date.now() / 1000)
        const token = await generateToken({ uid: user._id, iat })

        return { token }
    }
}
