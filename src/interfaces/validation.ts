import { Location } from 'express-validator'

export type ValidationErrors = {
    field: string
    location: Location | undefined
    message: string
    value: string | number
}

export type ValidationPath = 'signup'
