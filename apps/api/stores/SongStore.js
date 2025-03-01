const BaseStore = require('./BaseStore')

class SongStore extends BaseStore {
    async saveSong(title, description, composer, project_id) {
        const result = await this.exec(
            'INSERT INTO songs (title, description, composer, project_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, composer, project_id]
        )
        return result[0]
    }

    async addGenreToSong(song_id, genre_id) {
        await this.exec(
            'INSERT INTO songs_genres (song_id, genre_id) VALUES ($1, $2)',
            [song_id, genre_id]
        )
        return { message: 'Genre added to song' }
    }

    async getAll() {
        return await this.exec('SELECT * FROM songs')
    }

    async getAllProjectSongs(project_id) {
        return await this.exec('SELECT * FROM songs WHERE project_id = $1', [
            project_id,
        ])
    }

    async getSongById(id) {
        const result = await this.exec('SELECT * FROM songs WHERE id = $1', [
            id,
        ])
        return result[0]
    }

    async updateSong(id, title, description, composer, genre) {
        const result = await this.exec(
            'UPDATE songs SET title = $1, description = $2, composer = $3, genre = $4 WHERE id = $5 RETURNING *',
            [title, description, composer, genre, id]
        )
        return result[0]
    }

    async deleteSong(id) {
        await this.exec('DELETE FROM songs WHERE id = $1', [id])
        return { message: 'Song deleted' }
    }
}

module.exports = new SongStore()
