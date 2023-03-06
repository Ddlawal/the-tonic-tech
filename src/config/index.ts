import { CookieOptions } from 'express'
import env from './env'

export { default as dbClient } from './db'
export { default as env } from './env'
export { default as redisClient } from './redisClient'

export const getCookieConfig = (expiresIn: number): CookieOptions => ({
    httpOnly: true,
    expires: new Date(new Date().getTime() + expiresIn),
    maxAge: expiresIn * 1000, // milliseconds
    secure: !env.dev.isLocal, // secure in production
})
