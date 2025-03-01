// FileRouter.js
const express = require('express')
const multer = require('multer')
const fileController = require('../controllers/FileController')

// Multer-Konfiguration (Datei im Speicher halten)
const upload = multer({ storage: multer.memoryStorage() })

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management
 */
const router = express.Router()

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Uploads a file
 *     tags: [Files]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - song_id
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *               song_id:
 *                 type: integer
 *                 description: The song ID
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request (e.g., missing file)
 *       500:
 *         description: Server error
 */
router.post('/upload', upload.single('file'), fileController.uploadFile)

/**
 * @swagger
 * /api/files/single/{id}:
 *   get:
 *     summary: Retrieves a file by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The file ID
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.get('/single/:id', fileController.getFile)

/**
 * @swagger
 * /api/files/{song_id}:
 *   get:
 *     summary: Retrieves all files for a song
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: song_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The song ID
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *       404:
 *         description: No files found
 *       500:
 *         description: Server error
 */
router.get('/:song_id', fileController.getFiles)

/**
 * @swagger
 * /api/files/{id}:
 *   delete:
 *     summary: Deletes a file by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The file ID
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', fileController.deleteFile)

module.exports = router
