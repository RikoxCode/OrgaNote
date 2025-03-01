const express = require('express')
const userController = require('../controllers/UserController')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
const router = express.Router()

/**
 * @swagger
 * /api/users:
 *      get:
 *          tags: [Users]
 *          summary: Get all users
 *          description: This route calls the getAll controller.
 *          responses:
 *              200:
 *                  description: Successful response with users data
 *              500:
 *                  description: Server error
 *              404:
 *                  description: No users found
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/', userController.getAll)

module.exports = router
