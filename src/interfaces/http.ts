import { Request } from 'express'
import { HydratedDocument } from 'mongoose'
import { UserI } from './auth'

export interface GenericResponse<T = unknown> {
    data?: T
    error?: unknown
    message: string
    status: 'success' | 'error'
}

export interface GenericResponseWithPagination<T> extends GenericResponse<T> {
    currentPage: number
    totalCount: number
    totalPages: number
}

export interface RequestI extends Request {
    user?: HydratedDocument<UserI>
}

export interface QueryI {
    page: number
    perPage: number
}
