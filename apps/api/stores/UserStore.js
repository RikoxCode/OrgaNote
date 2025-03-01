const BaseStore = require('./BaseStore')

class UserStore extends BaseStore {
    async getAll() {
        return await this.exec(
            'SELECT id, username, realname, email, created_at, updated_at, logged_in_at FROM users'
        )
    }

    async search(keyword, value) {
        return await this.exec(
            `SELECT id, username, realname, email, created_at, updated_at, logged_in_at FROM users WHERE ${keyword} = %$1%`,
            [value]
        )
    }

    async getById(id) {
        return await this.exec(
            'SELECT id, username, realname, email, created_at, updated_at, logged_in_at FROM users WHERE id = $1',
            [id]
        )
    }

    async getByUsername(username) {
        return await this.exec(
            'SELECT id, username, realname, email, created_at, updated_at, logged_in_at FROM users WHERE username = $1',
            [username]
        )
    }

    async getByEmail(email) {
        return await this.exec(
            'SELECT id, username, realname, email, created_at, updated_at, logged_in_at, password_hash FROM users WHERE email = $1',
            [email]
        )
    }

    async create(
        username,
        email,
        password_hash,
        realname,
        created_at,
        updated_at,
        logged_in_at
    ) {
        return await this.exec(
            'INSERT INTO users (username, email, password_hash, realname, created_at, updated_at, logged_in_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [
                username,
                email,
                password_hash,
                realname,
                created_at,
                updated_at,
                logged_in_at,
            ]
        )
    }

    async update(id, name, email, password) {
        return await this.exec(
            'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, username, realname, email, created_at, updated_at, logged_in_at',
            [name, email, password, id]
        )
    }

    async updateLogin(id, logged_in_at) {
        return await this.exec(
            'UPDATE users SET logged_in_at = $1 WHERE id = $2 RETURNING id, username, realname, email, created_at, updated_at, logged_in_at',
            [logged_in_at, id]
        )
    }

    async delete(id) {
        await this.exec('DELETE FROM users WHERE id = $1', [id])
        return { message: 'User deleted' }
    }
}

module.exports = new UserStore()
