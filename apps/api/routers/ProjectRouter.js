const express = require('express')
const projectController = require('../controllers/ProjectController')
const AdminGuard = require('../guards/AdminGuard')
const ConductorGuard = require('../guards/ConductorGuard')

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */
const router = express.Router()

/**
 * @swagger
 * /api/projects:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Projects]
 *          summary: Get all projects (only for administators)
 *          description: This route calls the getAll controller.
 *          responses:
 *              200:
 *                  description: Successful response with project data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No projects found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', AdminGuard.middleware, projectController.getAll)

/**
 * @swagger
 * /api/projects/{id}:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Projects]
 *          summary: Get a project by id
 *          description: This route calls the getById controller.
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                    type: integer
 *                description: The id of the project
 *          responses:
 *              200:
 *                  description: Successful response with project data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No projects found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/:id', AdminGuard.middleware, projectController.getById)

/**
 * @swagger
 * /api/projects:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Projects]
 *          summary: Create a new project
 *          description: This route creates a new project.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - title
 *                              - description
 *                              - clubId
 *                              - profile_image
 *                              - banner_image
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: The title of the project
 *                              description:
 *                                  type: string
 *                                  description: The description of the project
 *                              clubId:
 *                                  type: integer
 *                                  description: The id of the club
 *                              profile_image:
 *                                  type: string
 *                                  description: The profile image of the project
 *                              banner_image:
 *                                  type: string
 *                                  description: The banner image of the project
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
router.post('/', ConductorGuard.middleware, projectController.create)

module.exports = router
