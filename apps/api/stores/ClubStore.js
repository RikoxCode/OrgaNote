const BaseStore = require('./BaseStore')

class ClubStore extends BaseStore {
    async getAll() {
        return await this.exec('SELECT * FROM clubs')
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
