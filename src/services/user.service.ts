import { Model, Types } from 'mongoose'

import { UserI } from '../interfaces/auth'
import { User } from '../schema'

export class AuthService {
    private userModel: Model<UserI>

    constructor() {
        this.userModel = User
    }

    public findUser = async (userId: Types.ObjectId) => {
        const user = await this.userModel.findOne({ _id: new Types.ObjectId(userId) }).select('-password')

        return user
    }
}
