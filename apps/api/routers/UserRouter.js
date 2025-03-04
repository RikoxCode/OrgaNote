const express = require('express')
const multer = require('multer')
const userController = require('../controllers/UserController')

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

/**
 * @swagger
 * /api/users/avatar:
 *   post:
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
router.post('/avatar', upload.single('avatar'), userController.setAvatar)


module.exports = router
