const FileStore = require('../stores/FileStore')

class FileController {
    async uploadFile(req, res) {
        try {
            console.log(req.file)

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' })
            }

            const { originalname, mimetype, buffer } = req.file
            const { song_id } = req.body

            const file = await FileStore.saveFile(
                song_id,
                originalname,
                mimetype,
                buffer
            )

            res.json({ message: 'File uploaded successfully', file })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getFile(req, res) {
        try {
            const { id } = req.params
            const file = await FileStore.getFile(id)
            if (!file) return res.status(404).json({ error: 'File not found' })
            res.setHeader('Content-Type', file.mimetype)
            res.send(file.data)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getFiles(req, res) {
        try {
            const { song_id } = req.params
            const files = await FileStore.getFiles(song_id)
            res.json(files)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async deleteFile(req, res) {
        try {
            const { id } = req.params
            await this.fileStore.deleteFile(id)
            res.json({ message: 'File deleted' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new FileController()
