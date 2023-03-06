import { Request } from 'express'
import { HydratedDocument } from 'mongoose'
import { UserI } from './auth'

export interface GenericResponse<T = unknown> {
    data?: T
    error?: unknown
    message: string
    status: 'success' | 'failed'
}

export interface RequestI extends Request {
    user?: HydratedDocument<UserI>
}
