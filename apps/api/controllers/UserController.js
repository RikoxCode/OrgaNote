const UserStore = require('../stores/UserStore')
const RoleStore = require('../stores/RoleStore')

class UserController {
    async getAll(req, res) {
        try {
            let users = await UserStore.getAll()

            users = await Promise.all(
                users.map(async (user) => {
                    user.roles = await RoleStore.getRolesByUserId(user.id)
                    return user
                })
            )

            res.json(users)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            const user = await UserStore.getById(id)
            if (!user) return res.status(404).json({ error: 'User not found' })
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getByUsername(req, res) {
        try {
            const { username } = req.params
            const user = await UserStore.getByUsername(username)
            if (!user) return res.status(404).json({ error: 'User not found' })
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getByEmail(req, res) {
        try {
            const { email } = req.params
            const user = await UserStore.getByEmail(email)
            if (!user) return res.status(404).json({ error: 'User not found' })
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async create(req, res) {
        try {
            const {
                username,
                email,
                password_hash,
                realname,
                created_at,
                updated_at,
                logged_in_at,
            } = req.body
            const user = await UserStore.create(
                username,
                email,
                password_hash,
                realname,
                created_at,
                updated_at,
                logged_in_at
            )
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const {
                id,
                username,
                email,
                password_hash,
                realname,
                created_at,
                updated_at,
                logged_in_at,
            } = req.body
            const user = await UserStore.update(
                id,
                username,
                email,
                password_hash,
                realname,
                created_at,
                updated_at,
                logged_in_at
            )
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const response = await UserStore.delete(id)
            res.status(204).send({ message: response })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new UserController()
