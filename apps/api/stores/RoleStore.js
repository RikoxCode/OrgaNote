const BaseStore = require('./BaseStore')

class RoleStore extends BaseStore {
    async addRoleToUser(userId, roleId) {
        return await this.exec(
            'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *',
            [userId, roleId]
        )
    }

    async removeRoleFromUser(userId, roleId) {
        return await this.exec(
            'DELETE FROM user_roles WHERE user_id = $1 AND role_id = $2',
            [userId, roleId]
        )
    }

    async getRolesByUserId(userId) {
        return await this.exec(
            'SELECT roles.id, roles.title, roles.description FROM roles JOIN user_roles ON roles.id = user_roles.role_id WHERE user_roles.user_id = $1',
            [userId]
        )
    }

    async getByID(id) {
        return await this.exec('SELECT * FROM roles WHERE id = $1', [id])
    }

    async getAll() {
        return await this.exec('SELECT * FROM roles')
    }
}

module.exports = new RoleStore()
