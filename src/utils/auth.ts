import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'

import { logger } from './logger'
import { env, redisClient } from '../config'
import { Auth } from '../interfaces/auth.interface'

const signToken = promisify(jwt.sign)

export const hashPassword = async (password: string, salt = 10) => {
    return bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}

// verify jwt token first
// if valid then decode and return auth
// if expired then throw error
export const getAuthByToken = async (token: string | undefined, secret: string): Promise<Auth | undefined> => {
    let auth: Auth | undefined

    if (!token) {
        return undefined
    }

    try {
        const decodedToken = jwt.verify(token, secret)

        auth = decodedToken as Auth
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            logger.error(`not a valid jwt token`, { token })
        }
        throw e
    }

    return auth
}

export const generateToken = async (auth: Auth, secret: string = env.server.jwtSecret) => {
    const token = (await signToken(auth, secret)) as string

    // Create a Session
    redisClient.set(`${auth.uid}`, JSON.stringify(auth), {
        EX: 60 * 60,
    })

    return token
}
