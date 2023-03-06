import * as dotenv from 'dotenv'

dotenv.config()

interface BackendEnv {
    app: {
        name: string
        version: string
        baseURL: string
    }
    db: {
        url: string
    }
    server: {
        jwtSecret: string
        jwtRefreshSecret: string
        redisUrl: string
        serverPort: number
    }
    dev: {
        isLocal: boolean
    }
}

const envParser =
    (env: { [key: string]: string | undefined }) =>
    (varName: string): string => {
        const value = env[varName]
        if (typeof value === 'string' && value) {
            return value
        }
        throw new Error(`Missing ${varName} with a non-empty value in process environment`)
    }

const parse = envParser(process.env)

const env: BackendEnv = {
    app: {
        name: parse('APP_NAME'),
        version: parse('APP_VERSION'),
        baseURL: parse('BASE_URL'),
    },
    db: {
        url: parse('DB_URL'),
    },
    server: {
        jwtSecret: parse('JWT_SECRET'),
        jwtRefreshSecret: parse('JWT_REFRESH_SECRET'),
        redisUrl: parse('REDIS_URL'),
        serverPort: parseInt(parse('SERVER_PORT'), 10),
    },
    dev: {
        isLocal: parse('NODE_ENV') === 'development',
    },
}

export default env
