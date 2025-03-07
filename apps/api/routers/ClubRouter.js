const express = require('express')
const clubController = require('../controllers/ClubController')
const MemberGuard = require('../guards/MemberGuard')
const AdminGuard = require('../guards/AdminGuard')
const ConductorGuard = require('../guards/ConductorGuard')

/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: Club management
 */
const router = express.Router()

/**
 * @swagger
 * /api/clubs/all:
 *      get:
 *          security:
 *              - bearerAuth: []
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
router.get('/all', AdminGuard.middleware, clubController.getAll)

/**
 * @swagger
 * /api/clubs:
 *     get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Clubs]
 *          summary: Get clubs by user
 *          description: This route calls the getUserClubs controller
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
router.get('/', MemberGuard.middleware, clubController.getUserClubs)

/**
 * @swagger
 * /api/clubs/{id}:
 *     get:
 *          security:
 *              - bearerAuth: []
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
router.get('/:id', MemberGuard.middleware, clubController.getById)

/**
 * @swagger
 * /api/clubs:
 *      post:
 *          security:
 *              - bearerAuth: []
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
router.post('/', MemberGuard.middleware, clubController.create)

/**
 * @swagger
 * /api/clubs/member:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Clubs]
 *          summary: Add a member to a club
 *          description: This route adds a member to a club.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - club_id
 *                              - user_id
 *                          properties:
 *                              club_id:
 *                                  type: integer
 *                                  description: The ID of the club
 *                              user_id:
 *                                  type: integer
 *                                  description: The ID of the user
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
router.post('/member', ConductorGuard.middleware, clubController.addMember)

/**
 * @swagger
 * /api/clubs/{id}:
 *      put:
 *          security:
 *              - bearerAuth: []
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
router.put('/:id', ConductorGuard.middleware, clubController.update)

/**
 * @swagger
 * /api/clubs/{id}:
 *      delete:
 *          security:
 *              - bearerAuth: []
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
router.delete('/:id', ConductorGuard.middleware, clubController.delete)

/**
 * @swagger
 * /api/clubs/member:
 *      delete:
 *          security:
 *              - bearerAuth: []
 *          tags: [Clubs]
 *          summary: Remove a member from a club
 *          description: This route removes a member from a club.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - club_id
 *                              - user_id
 *                          properties:
 *                              club_id:
 *                                  type: integer
 *                                  description: The ID of the club
 *                              user_id:
 *                                  type: integer
 *                                  description: The ID of the user
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
router.delete('/member', ConductorGuard.middleware, clubController.removeMember)

module.exports = router
