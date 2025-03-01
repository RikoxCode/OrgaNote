const BaseStore = require('./BaseStore')

class ProjectStore extends BaseStore {
    /**
     * This method returns all projects
     *
     * @returns {Promise<*>} - The projects
     */
    async getAll() {
        return await this.exec('SELECT * FROM projects')
    }

    /**
     * This method returns all projects for a given club
     *
     * @param {string} clubId - The id of the club
     * @returns {Promise<*>} - The projects for the club
     * */
    async getClubProjects(clubId) {
        const result = await this.exec(
            'SELECT * FROM projects WHERE club_id = $1',
            [clubId]
        )
        return result
    }

    /**
     * This method returns a project by its id
     *
     * @param {string} id - The id of the project
     * @returns {Promise<*>} - The project
     * */
    async getById(id) {
        const result = await this.exec('SELECT * FROM projects WHERE id = $1', [
            id,
        ])
        return result.rows
    }

    /**
     * This method returns all projects
     * @param songId
     * @returns {Promise<*>}
     */
    async getAllProjectsFromSong(songId) {
        return await this.exec(
            'SELECT * FROM projects WHERE id = (SELECT project_id FROM songs WHERE id = $1)',
            [songId]
        )
    }

    /**
     * This method creates a new project
     *
     * @param {string} title - The title of the project
     * @param {string} description - The description of the project
     * @param {string} clubId - The id of the club
     * @param {string} profile_image - The profile image of the project
     * @param {string} banner_image - The banner image of the project
     * @returns {Promise<*>} - The created project
     * */
    async create(title, description, clubId, profile_image, banner_image) {
        const result = await this.exec(
            'INSERT INTO projects (title, description, club_id, profile_image, banner_image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, clubId, profile_image, banner_image]
        )
        return result.rows
    }

    /**
     * This method updates a project
     *
     * @param {string} id - The id of the project
     * @param {string} title - The title of the project
     * @param {string} description - The description of the project
     * @param {string} profile_image - The profile image of the project
     * @param {string} banner_image - The banner image of the project
     * @returns {Promise<*>} - The updated project
     * */
    async update(id, title, description, profile_image, banner_image) {
        const result = await this.exec(
            'UPDATE projects SET title = $1, description = $2, profile_image = $3, banner_image = $4 WHERE id = $3 RETURNING *',
            [title, description, profile_image, banner_image, id]
        )
        return result.rows
    }

    /**
     * This method deletes a project
     *
     * @param {string} id - The id of the project
     * @returns {Promise<*>} - The result of the deletion
     * */
    async delete(id) {
        await this.exec('DELETE FROM projects WHERE id = $1', [id])
        return { message: 'Project deleted' }
    }
}

module.exports = new ProjectStore()
