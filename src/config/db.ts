import mongoose, { MongooseError } from 'mongoose'
import { logger } from '../utils/logger'
import { env } from '.'
import { HttpException } from '../middleware/errors.middleware'
import httpStatus from 'http-status'

async function dbClient() {
    try {
        mongoose.connect(env.db.url)

        if (env.dev.isLocal) mongoose.set('debug', true)

        logger.info('Db connected successfully')
    } catch (err) {
        const error = err as MongooseError
        logger.error(error)
        throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, error.message || 'Error! Connecting to database.')
    }
}

export default dbClient
