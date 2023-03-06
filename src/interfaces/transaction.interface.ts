import { Types } from 'mongoose'

export enum TransactionType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

export type TransactionTypeI = keyof typeof TransactionType

export enum TransactionStatus {
    PENDING = 'PENDING',
    FAILED = 'FAILED',
    SUCCESSFUL = 'SUCCESSFUL',
    CANCELLED = 'CANCELLED',
}

export type TransactionStatusI = keyof typeof TransactionStatus

export interface TransactionI {
    amount: number
    from: Types.ObjectId // AccountDetailsId
    narration?: string
    status: TransactionStatus
    to: Types.ObjectId // AccountDetailsId
    transactionType: TransactionTypeI
    userId: Types.ObjectId
}
