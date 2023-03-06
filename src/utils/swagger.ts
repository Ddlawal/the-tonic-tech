import express, { Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { env } from '../config'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'The Tonic Techologies Assessment API Docs',
            version: env.app.version,
            description: `This is the API Documentation for [${env.app.name}](${env.app.baseURL})`,
        },
        servers: [
            {
                url: '{defaultHost}',
                description: 'this is the default url the API e.g. Main (production) server',
                variables: {
                    defaultHost: {
                        default: env.app.baseURL,
                    },
                },
            },
        ],
        security: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    apis: [
        './app/src/controllers/**/*.controller.ts',
        './app/src/routes/**/*.routes.ts',
        './app/src/entity/*.ts',
        './app/docs/**/*.ts',
    ],
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app: express.Application) => {
    // Swagger page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

    // Docs in JSON format
    app.get('/docs.json', (_req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    // console.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs
