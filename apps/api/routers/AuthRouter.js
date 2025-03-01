const express = require('express')
const authController = require('../controllers/AuthController')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management
 */
const router = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *      post:
 *          tags: [Auth]
 *          summary: Register a new user
 *          description: This route calls the register controller.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - username
 *                              - realname
 *                              - email
 *                              - password
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  description: The username of the user
 *                              realname:
 *                                  type: string
 *                                  description: The real name of the user
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *                              password:
 *                                  type: string
 *                                  description: The password of the user
 *                                  format: password
 *                                  minLength: 6
 *                                  maxLength: 100
 *          responses:
 *                200:
 *                    description: Successful response with user data and token
 *                500:
 *                    description: Server error
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post('/register', authController.register)

/**
 * @swagger
 * /api/auth/login:
 *      post:
 *          tags: [Auth]
 *          summary: Login a user
 *          description: This route calls the login controller.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *                              password:
 *                                  type: string
 *                                  description: The password of the user
 *                                  format: password
 *                                  minLength: 6
 *                                  maxLength: 100
 *          responses:
 *                200:
 *                    description: Successful response with user data and token
 *                500:
 *                    description: Server error
 *                400:
 *                    description: Missing or invalid parameters
 */
router.post('/login', authController.login)

/**
 * @swagger
 * /api/auth/refresh:
 *      get:
 *          tags: [Auth]
 *          summary: Refresh user token
 *          description: This route calls the refresh controller.
 *          responses:
 *              200:
 *                  description: Successful response with user data and token
 *              500:
 *                  description: Server error
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/refresh', authController.refresh)

/**
 * @swagger
 * /api/auth/me:
 *      get:
 *          tags: [Auth]
 *          summary: Get user data
 *          description: This route calls the me controller.
 *          responses:
 *              200:
 *                  description: Successful response with user data and token
 *              500:
 *                  description: Server error
 *              400:
 *                  description: Missing or invalid parameters
 */
router.get('/me', authController.me)

module.exports = router
