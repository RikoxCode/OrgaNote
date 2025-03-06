const express = require('express')
const roleController = require('../controllers/RoleController')
const ConductorGuard = require('../guards/ConductorGuard')

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */
const router = express.Router()

/**
 * @swagger
 * /api/roles:
 *      get:
 *          tags: [Roles]
 *          summary: Get all roles
 *          description: This route calls the getAll controller.
 *          responses:
 *              200:
 *                  description: Successful response with roles data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No roles found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', roleController.getAll)

/**
 * @swagger
 * /api/roles/{id}:
 *      get:
 *          tags: [Roles]
 *          summary: Get a role by ID
 *          description: This route calls the getById controller.
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The id of the role
 *          responses:
 *              200:
 *                  description: Successful response with role data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No role found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/:id', roleController.getById)

/**
 * @swagger
 * /api/roles/add:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Roles]
 *          summary: Add a role to a user
 *          description: This route calls the addRoleToUser controller.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - roleId
 *                              - userId
 *                          properties:
 *                              roleId:
 *                                  type: integer
 *                                  description: The id of the role
 *                              userId:
 *                                  type: integer
 *                                  description: The id of the user
 *          responses:
 *                200:
 *                    description: Successful response with user data
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No user found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post('/add', ConductorGuard.middleware, roleController.addRoleToUser)

/**
 * @swagger
 * /api/roles/remove:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Roles]
 *          summary: Remove a role from a user
 *          description: This route calls the removeRoleFromUser controller.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - userId
 *                              - roleId
 *                          properties:
 *                              roleId:
 *                                  type: integer
 *                                  description: The id of the role
 *                              userId:
 *                                  type: integer
 *                                  description: The id of the user
 *          responses:
 *                200:
 *                    description: Successful response with message
 *                500:
 *                    description: Server error
 *                404:
 *                    description: No user found
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post(
    '/remove',
    ConductorGuard.middleware,
    roleController.removeRoleFromUser
)

module.exports = router
