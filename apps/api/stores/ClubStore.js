const BaseStore = require('./BaseStore')

class ClubStore extends BaseStore {
    async getAll() {
        return await this.exec('SELECT * FROM clubs')
    }

    async getClubsByUser(userId) {
        return await this.exec(
            'SELECT c.* FROM clubs AS c JOIN user_club AS uc ON c.id = uc.club_id WHERE uc.user_id = $1;',
            [userId]
        )
    }

    async getById(id) {
        const result = await this.exec('SELECT * FROM clubs WHERE id = $1', [
            id,
        ])
        return result[0]
    }

    async create(name, location) {
        const result = await this.exec(
            'INSERT INTO clubs (name, location) VALUES ($1, $2) RETURNING *',
            [name, location]
        )
        return result[0]
    }

    async addMember(clubId, userId) {
        const result = await this.exec(
            'INSERT INTO user_club (club_id, user_id) VALUES ($1, $2) RETURNING *',
            [clubId, userId]
        )
        return result[0]
    }

    async removeMember(clubId, userId) {
        await this.exec(
            'DELETE FROM user_club WHERE club_id = $1 AND user_id = $2',
            [clubId, userId]
        )
        return { message: 'Member removed' }
    }

    async update(id, name, location) {
        const result = await this.exec(
            'UPDATE clubs SET name = $1, location = $2 WHERE id = $3 RETURNING *',
            [name, location, id]
        )
        return result[0]
    }

    async delete(id) {
        await this.exec('DELETE FROM clubs WHERE id = $1', [id])
        return { message: 'Club deleted' }
    }
}

module.exports = new ClubStore()
