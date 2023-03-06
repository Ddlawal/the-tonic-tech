import { Model, Types } from 'mongoose'

import { UserI } from '../interfaces/auth.interface'
import { GenericResponseWithPagination, QueryI } from '../interfaces/http.interface'
import { User } from '../schema'

export class UserService {
    private userModel: Model<UserI>

    constructor() {
        this.userModel = User
    }

    public findUser = async (userId: Types.ObjectId) => {
        const user = await this.userModel.findOne({ _id: new Types.ObjectId(userId) }).select('-password')

        return user
    }

    public getAllUsers = async ({
        page = 1,
        perPage = 10,
    }: QueryI): Promise<GenericResponseWithPagination<Array<Omit<UserI, 'password'>>>> => {
        const skip = (Number(page) - 1) * Number(perPage)
        const users = await this.userModel.find().skip(skip).limit(Number(perPage)).select('-password -__v').exec()
        const totalCount = await this.userModel.count()
        const totalPages = Math.ceil(totalCount / Number(perPage))

        return {
            currentPage: Number(page),
            data: users,
            message: 'Users retrieved successfully',
            status: 'success',
            totalCount,
            totalPages,
        }
    }
}
