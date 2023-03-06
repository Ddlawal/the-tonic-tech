import dotenv from 'dotenv'

import { server } from './app'
import { dbClient, env } from './config'
import { logger } from './utils/logger'
import swaggerJsdoc from './utils/swagger'

dotenv.config({ path: '/' })

const port = env.server.serverPort || 3000

const main = async () => {
    const { app } = server()

    swaggerJsdoc(app)

    // Init DB
    await dbClient()

    app.listen(port, () => {
        logger.notice(`🚀 Server ready on port ${port}`)
    })
}

// only call main if the file was called from the CLI and wasn't required from another module
if (require.main === module) {
    main()
}
