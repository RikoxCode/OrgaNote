const express = require('express')
const genreController = require('../controllers/GenreController')
const ConductorGuard = require('../guards/ConductorGuard')

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genre management
 */
const router = express.Router()

/**
 * @swagger
 * /api/genres:
 *      get:
 *          tags: [Genres]
 *          summary: Get all genres
 *          description: This route calls the getAll controller.
 *          responses:
 *              200:
 *                  description: Successful response with genre data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No genre found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', genreController.getAll)

/**
 * @swagger
 * /api/genres/{id}:
 *      get:
 *          tags: [Genres]
 *          summary: Get genre by id
 *          description: This route calls the getById controller
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The id of the genre
 *          responses:
 *              200:
 *                  description: Successful response with genre data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No genre found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/:id', genreController.getById)

/**
 * @swagger
 * /api/genres:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Genres]
 *          summary: Create a new genre
 *          description: This route calls the create controller
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title
 *                              - description
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: The title of the genre
 *                              description:
 *                                  type: string
 *                                  description: The description of the genre
 *          responses:
 *                200:
 *                    description: Successful response with genre data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No genre found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post('/', ConductorGuard.middleware, genreController.create)

/**
 * @swagger
 * /api/genres:
 *      put:
 *          security:
 *              - bearerAuth: []
 *          tags: [Genres]
 *          summary: Updates a genre
 *          description: This route calls the update controller
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - id
 *                              - title
 *                              - description
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: The id of the genre
 *                              title:
 *                                  type: string
 *                                  description: The title of the genre
 *                              description:
 *                                  type: string
 *                                  description: The description of the genre
 *          responses:
 *                200:
 *                    description: Successful response with genre data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No genre found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.put('/', ConductorGuard.middleware, genreController.update)

/**
 * @swagger
 * /api/genres/{id}:
 *      delete:
 *          security:
 *              - bearerAuth: []
 *          tags: [Genres]
 *          summary: Deletes a genre
 *          description: This route calls the delete controller
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The id of the genre
 *          responses:
 *                200:
 *                    description: Successful response with genre data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No genres found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.delete('/:id', ConductorGuard.middleware, genreController.delete)

module.exports = router
