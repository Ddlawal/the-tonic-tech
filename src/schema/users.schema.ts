import mongoose from 'mongoose'
import { UserI } from '../interfaces/auth'

const UsersSchema = new mongoose.Schema<UserI>(
    {
        firstname: String,
        lastname: String,
        email: String,
        role: {
            type: String,
            enum: ['ADMIN', 'CUSTOMER', 'TELLER'],
            default: 'CUSTOMER',
        },
        password: String,
    },
    {
        collection: 'users',
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

const User = mongoose.model<UserI>('users', UsersSchema)

export default User
