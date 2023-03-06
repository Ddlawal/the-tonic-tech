import express, { Express, json, urlencoded } from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import { errorMiddleware } from './middleware/errors.middleware'
import { corsConfig } from './utils/corsConfig'
import { env } from './config'
import Routes from './routes'

const app = express()

app.use(json({ limit: '1024kb' }))
app.use(urlencoded({ extended: true }))
app.use(cors(corsConfig))
app.use(helmet()) // sets headers to protect the server from some well-known web vulnerabilities
app.use(cookieParser())

app.disable('x-powered-by') // Reduce fingeprinting, not a vulnerabilty itself

if (!env.dev.isLocal) {
    const apiLimiter = rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 50, // Limit each IP to 10 requests per `window` (here, per minute)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
    // Apply the rate limiting middleware to API calls only
    app.use('/api/', apiLimiter)
}

export const server = (): { app: Express } => {
    app.get('/', (req, res) => {
        res.send('Welcome to ROOTS')
    })

    // Inject API Routes
    app.use('/api', new Routes().routes())

    // Reduce fingerprinting
    app.use((req, res) => {
        res.destroy(new Error('Unauthorized'))
    })

    // Inject error middleware
    app.use(errorMiddleware)

    return { app }
}
