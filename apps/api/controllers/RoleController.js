const RoleStore = require('../stores/RoleStore')

class RoleController {
    async addRoleToUser(req, res) {
        const { userId, roleId } = req.body

        try {
            console.log(userId, roleId)

            await RoleStore.addRoleToUser(userId, roleId)
            res.status(200).json({ message: 'Role added to user' })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async removeRoleFromUser(req, res) {
        const { userId, roleId } = req.body

        try {
            await RoleStore.removeRoleFromUser(userId, roleId)
            res.status(200).json({ message: 'Role removed from user' })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async getRolesByUserId(req, res) {
        const { userId } = req.params

        try {
            const roles = await RoleStore.getRolesByUserId(userId)
            res.status(200).json(roles)
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async getById(req, res) {
        const { id } = req.params

        try {
            const role = await RoleStore.getById(id)
            res.status(200).json(role)
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const roles = await RoleStore.getAll()
            res.status(200).json(roles)
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new RoleController()
