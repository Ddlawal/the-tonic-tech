import mongoose, { Schema } from 'mongoose'
import { AccountI, AccountType } from '../interfaces/account.interface'

const AccountSchema = new mongoose.Schema<AccountI>(
    {
        accountNo: { type: String, minlength: 10, maxlength: 10, required: true },
        accountType: { type: String, enum: AccountType, required: true },
        bvn: { type: String, minlength: 11, maxlength: 11, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        collection: 'account',
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

const Account = mongoose.model<AccountI>('account', AccountSchema)

export default Account
