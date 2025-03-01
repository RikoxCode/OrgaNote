const express = require('express')
const songController = require('../controllers/SongController')

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Song management
 */
const router = express.Router()

/**
 * @swagger
 * /api/songs:
 *      get:
 *          tags: [Songs]
 *          summary: Get all songs (Only for administators)
 *          description: This route calls the getAll controller.
 *          responses:
 *              200:
 *                  description: Successful response with song data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No songs found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', songController.getAll)

/**
 * @swagger
 * /api/songs/project/{project_id}:
 *      get:
 *          tags: [Songs]
 *          summary: Get all project songs
 *          description: This route calls the getAllProjectSongs controller.
 *          responses:
 *              200:
 *                  description: Successful response with song data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No songs found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', songController.getAllProjectSongs)

/**
 * @swagger
 * /api/songs/{id}:
 *      get:
 *          tags: [Songs]
 *          summary: Get song by id
 *          description: This route calls the getById controller
 *          responses:
 *              200:
 *                  description: Successful response with song data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: Song not found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', songController.getById)

/**
 * @swagger
 * /api/songs:
 *      post:
 *          tags: [Songs]
 *          summary: Create a new song
 *          description: This route calls the create controller.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title
 *                              - description
 *                              - composer
 *                              - genre
 *                              - project_id
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: The title of the song
 *                              description:
 *                                  type: string
 *                                  description: The description of the song
 *                              composer:
 *                                  type: string
 *                                  description: The composer of the song
 *                              genres:
 *                                  type: integer[]
 *                                  description: The genres of the song
 *                              project_id:
 *                                  type: integer
 *                                  description: The id of the project
 *          responses:
 *                200:
 *                    description: Successful response with song data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No songs found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post('/', songController.create)

/**
 * @swagger
 * /api/songs:
 *      put:
 *          tags: [Songs]
 *          summary: Create a new song
 *          description: This route calls the create controller.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title
 *                              - description
 *                              - composer
 *                              - genres
 *                              - project_id
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: The title of the song
 *                              description:
 *                                  type: string
 *                                  description: The description of the song
 *                              composer:
 *                                  type: string
 *                                  description: The composer of the song
 *                              genres:
 *                                  type: integer[]
 *                                  description: The genres of the song
 *                              project_id:
 *                                  type: integer
 *                                  description: The id of the project
 *          responses:
 *                200:
 *                    description: Successful response with song data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No songs found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post('/', songController.update)

/**
 * @swagger
 * /api/songs/{id}:
 *      delete:
 *          tags: [Songs]
 *          summary: Delete a song
 *          description: This route calls the delete controller.
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The id of the song
 *          responses:
 *                200:
 *                    description: Successful response
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No songs found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.delete('/:id', songController.delete)

module.exports = router
