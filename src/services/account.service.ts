import httpStatus from 'http-status'
import { HydratedDocument, Model, Types } from 'mongoose'
import { AccountI } from '../interfaces/account.interface'

import { GenericResponse, GenericResponseWithPagination, QueryI } from '../interfaces/http.interface'
import { HttpException } from '../middleware/errors.middleware'
import { Account } from '../schema'

export class AccountService {
    private accountModel: Model<AccountI>

    constructor() {
        this.accountModel = Account
    }

    public create = async (
        accountData: Omit<AccountI, 'accountNo'>,
        userId: Types.ObjectId
    ): Promise<GenericResponse<HydratedDocument<AccountI>>> => {
        const accountNo = '1234324329' // TODO: Generate account number

        const account = await this.accountModel.create({
            ...accountData,
            accountNo,
            userId,
        })

        return {
            data: account,
            message: 'Account created successful',
            status: 'success',
        }
    }

    public getUserAccountById = async (
        accountId: Types.ObjectId,
        userId: Types.ObjectId
    ): Promise<GenericResponse<Array<HydratedDocument<AccountI>>>> => {
        const accounts = await this.accountModel.find({ _id: new Types.ObjectId(accountId), userId })

        if (!accounts.length) {
            throw new HttpException(httpStatus.NOT_FOUND, 'No account found')
        }

        return {
            data: accounts,
            message: 'Account retrieved successfully',
            status: 'success',
        }
    }

    public getAllAccounts = async ({
        page = 1,
        perPage = 10,
    }: QueryI): Promise<GenericResponseWithPagination<Array<HydratedDocument<AccountI>>>> => {
        const skip = (Number(page) - 1) * Number(perPage)
        const accounts = await this.accountModel
            .find()
            .populate('userId', 'firstname lastname role')
            .skip(skip)
            .limit(Number(perPage))
            .select('-__v')
            .exec()

        const totalCount = await this.accountModel.count()
        const totalPages = Math.ceil(totalCount / Number(perPage))

        return {
            currentPage: Number(page),
            data: accounts,
            message: 'Accounts retrieved successfully',
            status: 'success',
            totalCount,
            totalPages,
        }
    }
}
