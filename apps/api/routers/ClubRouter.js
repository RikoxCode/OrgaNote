const express = require('express')
const clubController = require('../controllers/ClubController')

/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: Club management
 */
const router = express.Router()

/**
 * @swagger
 * /api/clubs:
 *      get:
 *          tags: [Clubs]
 *          summary: Get all clubs
 *          description: This route calls the getAll controller.
 *          responses:
 *              200:
 *                  description: Successful response with club data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No clubs found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', clubController.getAll)

/**
 * @swagger
 * /api/clubs/{id}:
 *     get:
 *          tags: [Clubs]
 *          summary: Get club by id
 *          description: This route calls the getById controller
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The id of the club
 *          responses:
 *               200:
 *                   description: Successful response with club data
 *               500:
 *                   description: Server error
 *               404:
 *                   description: No clubs found
 *               400:
 *                   description: Missing or invalid parameters
 */
router.get('/:id', clubController.getById)

/**
 * @swagger
 * /api/clubs:
 *      post:
 *          tags: [Clubs]
 *          summary: Create a new club
 *          description: This route creates a new club.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - name
 *                              - location
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The name of the club
 *                              location:
 *                                  type: string
 *                                  description: The location of the club
 *          responses:
 *                200:
 *                    description: Successful response with club data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No clubs found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post('/', clubController.create)

/**
 * @swagger
 * /api/clubs/{id}:
 *      put:
 *          tags: [Clubs]
 *          summary: Update a club
 *          description: This route updates a club based on the provided ID.
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The ID of the club to update
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The updated name of the club
 *                              location:
 *                                  type: string
 *                                  description: The updated location of the club
 *          responses:
 *                200:
 *                    description: Successful response with club data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No clubs found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.put('/:id', clubController.update)

/**
 * @swagger
 * /api/clubs/{id}:
 *      delete:
 *          tags: [Clubs]
 *          summary: Delete a club
 *          description: This route deletes a club based on the provided ID.
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The ID of the club to delete
 *          responses:
 *                200:
 *                    description: Successful response with club data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No clubs found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.delete('/:id', clubController.delete)

module.exports = router
