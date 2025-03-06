const express = require('express')
const multer = require('multer')
const userController = require('../controllers/UserController')
const AdminGuard = require('../guards/AdminGuard')
const ConductorGuard = require('../guards/ConductorGuard')
const MemberGuard = require('../guards/MemberGuard')

// Multer-Konfiguration (Datei im Speicher halten)
const upload = multer({ storage: multer.memoryStorage() })

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
 *          security:
 *              - bearerAuth: []
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
router.get('/', ConductorGuard.middleware, userController.getAll)

/**
 * @swagger
 * /api/users/search:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Users]
 *          summary: Search users
 *          description: This route calls the search controller. It requires a keyword and a value. ?keyword=username&value=John
 *          parameters:
 *              - in: query
 *                name: keyword
 *                required: true
 *                schema:
 *                    type: string
 *                description: The keyword to search by (e.g., username)
 *              - in: query
 *                name: value
 *                required: true
 *                schema:
 *                    type: string
 *                description: The value to search for (e.g., John)
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
router.get('/search', MemberGuard.middleware, userController.search)

/**
 * @swagger
 * /api/users/avatar:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Uploads a user avatar
 *     tags: [Users]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - avatar
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The user ID
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The avatar to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request (e.g., missing file)
 *       500:
 *         description: Server error
 */
router.post('/avatar', upload.single('avatar'), AdminGuard.middleware, userController.setAvatar)

module.exports = router
