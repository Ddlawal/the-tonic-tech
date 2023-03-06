import { createClient } from 'redis'
import { logger } from '../utils/logger'
import env from './env'

const redisClient = createClient({
    url: env.server.redisUrl,
})

const connectRedis = async () => {
    try {
        await redisClient.connect()
        logger.info('Redis client connected...')
    } catch (error) {
        logger.error(error)
        setTimeout(connectRedis, 5000) // retry in 5 seconds
    }
}

connectRedis()

redisClient.on('error', (err) => logger.error(err))

export default redisClient
