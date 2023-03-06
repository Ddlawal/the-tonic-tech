import { Types } from 'mongoose'

export interface Auth {
    uid: Types.ObjectId
    iat?: number
    userRole?: string
    expiry?: number
}

export interface UserCredentials {
    email: string
    password: string
}

export enum Role {
    ADMIN,
    CUSTOMER,
    TELLER,
}

export type RoleI = keyof typeof Role

export interface UserI {
    firstname: string
    lastname: string
    email: string
    role: RoleI
    password: string
}

export interface SignupResponse extends Omit<UserI, 'password'> {
    password?: string
}

export interface LoginResponse {
    refreshToken: string
    token: string
}
