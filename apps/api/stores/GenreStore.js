const BaseStore = require('./BaseStore')

class GenreStore extends BaseStore {
    /**
     * This method returns all genres
     *
     * @returns {Promise<*>} - The genres
     */
    async getAll() {
        return await this.exec('SELECT * FROM genres')
    }

    /**
     * This method returns a genre by its id
     *
     * @param {string} id - The id of the genre
     * @returns {Promise<*>} - The genre
     * */
    async getById(id) {
        return await this.exec('SELECT * FROM genres WHERE id = $1', [id])
    }

    /**
     * This method returns all genres from a song
     *
     * @param {string} song_id - The id of the song
     * @returns {Promise<*>} - The genres
     * */
    async getAllGenresFromSong(song_id) {
        return await this.exec(
            `SELECT g.* FROM genres g
            JOIN songs_genres sg ON g.id = sg.genre_id
            WHERE sg.song_id = $1`,
            [song_id]
        )
    }

    /**
     * This method creates a new genre
     *
     * @param {string} title - The title of the genre
     * @param {string} description - The description of the genre
     * @returns {Promise<*>} - The created genre
     * */
    async create(title, description) {
        return await this.exec(
            'INSERT INTO genres (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        )
    }

    /**
     * This method updates a genre
     *
     * @param {string} id - The id of the genre
     * @param {string} title - The title of the genre
     * @param {string} description - The description
     * @returns {Promise<*>} - The updated genre
     * */
    async update(id, title, description) {
        return await this.exec(
            'UPDATE genres SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]
        )
    }

    /**
     * This method deletes a genre
     *
     * @param {string} id - The id of the genre
     * @returns {Promise<*>} - The message
     * */
    async delete(id) {
        await this.exec('DELETE FROM genres WHERE id = $1', [id])
        return { message: 'Genre deleted' }
    }
}

module.exports = new GenreStore()
