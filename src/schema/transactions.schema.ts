import mongoose, { Schema } from 'mongoose'
import { TransactionI, TransactionStatus, TransactionType } from '../interfaces/transaction.interface'

const TransactionSchema = new mongoose.Schema<TransactionI>(
    {
        from: { type: Schema.Types.ObjectId, ref: 'Account' },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number, required: true },
        to: { type: Schema.Types.ObjectId, ref: 'Account' },
        narration: { tyoe: String },
        status: { type: String, enum: TransactionStatus, default: TransactionStatus.PENDING },
        transactionType: { type: String, enum: TransactionType, required: true },
    },
    {
        collection: 'transactions',
        id: false,
        autoCreate: true,
        timestamps: true,
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        },
    }
)

const Transaction = mongoose.model<TransactionI>('transactions', TransactionSchema)

export default Transaction
