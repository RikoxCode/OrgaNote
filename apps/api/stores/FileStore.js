// FileStore.js
const BaseStore = require('./BaseStore')

class FileStore extends BaseStore {
    async saveFile(song_id, filename, mimetype, buffer) {
        const result = await this.exec(
            'INSERT INTO files (song_id, filename, mimetype, data) VALUES ($1, $2, $3, $4) RETURNING *',
            [song_id, filename, mimetype, buffer]
        )
        return result[0]
    }

    async getFiles(song_id) {
        return await this.exec('SELECT * FROM files WHERE song_id = $1', [
            song_id,
        ])
    }

    async getFile(id) {
        const result = await this.exec('SELECT * FROM files WHERE id = $1', [
            id,
        ])
        return result[0]
    }

    async deleteFile(id) {
        await this.exec('DELETE FROM files WHERE id = $1', [id])
        return { message: 'File deleted' }
    }
}

module.exports = new FileStore()
