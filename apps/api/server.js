const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require('./cors.config.json')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const app = express()

// Import routes
const fileRoutes = require('./routers/FileRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const clubRoutes = require('./routers/ClubRouter')
const projectRoutes = require('./routers/ProjectRouter')
const userRoutes = require('./routers/UserRouter')
const songRoutes = require('./routers/SongRouter')
const performanceRoutes = require('./routers/PerformanceRouter')
const genreRoutes = require('./routers/GenreRouter')
const authRoutes = require('./routers/AuthRouter')
const roleRoutes = require('./routers/RoleRouter')

// Swagger Optionen
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'OrgaNote API Dokumentation',
            version: '1.0.0',
            description: 'Dokumentation für die OrgaNote API',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'JSONPlaceholder',
                url: 'https://jsonplaceholder.typicode.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routers/*.js'], // Pfad zu den API-Routen
}

// Middleware
app.use(helmet())
app.use(morgan('combined'))
app.use(cors(corsOptions))

// Use routes
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/auth', authRoutes)
app.use('/api/genres', genreRoutes)
app.use('/api/clubs', clubRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/users', userRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/performances', performanceRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/roles', roleRoutes)

// Start server
app.listen(process.env.API_PORT, process.env.API_HOST, () => {
    console.log(
        `API listening on ${process.env.API_HOST}:${process.env.API_PORT}`
    )
    console.log(
        `OpenAPI docs available at http://localhost:${process.env.API_PORT}/api-docs`
    )
})
