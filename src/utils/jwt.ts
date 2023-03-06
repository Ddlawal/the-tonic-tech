import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'

import { env } from '../config'

const signToken = promisify(jwt.sign)

export async function generateAuthToken(userId: string): Promise<string | undefined> {
    try {
        const authToken = await signToken({ uid: userId }, env.server.jwtSecret)

        return authToken as string
    } catch {
        return undefined
    }
}
