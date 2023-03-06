import { Types } from 'mongoose'

export enum AccountType {
    CURRENT = 'CURRENT',
    SAVINGSS = 'SAVINGSS',
}

export type AccountTypeI = keyof typeof AccountType

export interface AccountI {
    accountNo: string
    accountType: AccountTypeI
    bvn: string
    userId: Types.ObjectId
}
