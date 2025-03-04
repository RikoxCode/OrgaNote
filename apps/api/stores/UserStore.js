const BaseStore = require('./BaseStore')

class UserStore extends BaseStore {
    async getAll() {
        return await this.exec(
            'SELECT id, username, realname, email, avatar, created_at, updated_at, logged_in_at FROM users'
        )
    }

    async search(keyword, value) {
        return await this.exec(
            `SELECT id, username, realname, email, avatar, created_at, updated_at, logged_in_at FROM users WHERE ${keyword} = %$1%`,
            [value]
        )
    }

    async getById(id) {
        return await this.exec(
            'SELECT id, username, realname, email, avatar, created_at, updated_at, logged_in_at FROM users WHERE id = $1',
            [id]
        )
    }

    async getByUsername(username) {
        return await this.exec(
            'SELECT id, username, realname, email, avatar, created_at, updated_at, logged_in_at FROM users WHERE username = $1',
            [username]
        )
    }

    async getByEmail(email) {
        return await this.exec(
            'SELECT id, username, realname, email, avatar, created_at, updated_at, logged_in_at, password_hash FROM users WHERE email = $1',
            [email]
        )
    }

    async getUserRoles(userId) {
        return await this.exec(
            'SELECT r.* FROM roles AS r JOIN user_roles AS ur ON r.id = ur.role_id WHERE ur.user_id = $1',
            [userId]
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

    async setAvatar(userId, buffer, updated_at) {
        return await this.exec(
            'UPDATE users SET avatar = $1, updated_at = $2 WHERE id = $3 RETURNING id, username, realname, email, avatar, created_at, updated_at, logged_in_at',
            [buffer, updated_at, userId]
        )
    }

    async update(id, username, realname, email, updated_at) {
        return await this.exec(
            'UPDATE users SET username = $1, realname = $2, email = $3, updated_at = $4 WHERE id = $5 RETURNING id, username, realname, email, avatar, created_at, updated_at, logged_in_at',
            [username, realname, email, updated_at, id]
        )
    }

    async updateLogin(id, logged_in_at) {
        return await this.exec(
            'UPDATE users SET logged_in_at = $1 WHERE id = $2 RETURNING id, username, realname, email, avatar, created_at, updated_at, logged_in_at',
            [logged_in_at, id]
        )
    }

    async delete(id) {
        await this.exec('DELETE FROM users WHERE id = $1', [id])
        return { message: 'User deleted' }
    }
}

module.exports = new UserStore()
