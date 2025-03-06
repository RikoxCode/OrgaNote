const UserStore = require('../stores/UserStore')
const UserValidator = require('../validators/UserValidator')
const RoleStore = require('../stores/RoleStore')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function generateToken(user, payload = {}) {
    user.roles = await UserStore.getUserRoles(user.id)

    if (user.password_hash) delete user.password_hash
    if (user.avatar) delete user.avatar

    payload = {
        user,
        exp: Date.now() + Number(process.env.JWT_EXPIRES_IN),
        ...payload,
    }

    return jwt.sign(payload, process.env.JWT_SECRET)
}

class AuthController {
    constructor() {}

    async register(req, res) {
        const { username, realname, email, password } = req.body
        const createdAt = new Date()
        const updatedAt = new Date()
        const loginAt = new Date()

        try {
            if (
                await UserValidator.validateProject({
                    username,
                    realname,
                    email,
                    password,
                })
            ) {
                // Hash the password
                const passwordHash = bcrypt.hashSync(
                    password,
                    Number(process.env.BCRYPT_SALT_ROUNDS)
                )

                let user = await UserStore.create(
                    username,
                    email,
                    passwordHash,
                    realname,
                    createdAt,
                    updatedAt,
                    loginAt
                )

                await RoleStore.addRoleToUser(user.id, 'member')

                user.roles = await UserStore.getUserRoles(user.id)

                const { password_hash, ...responseUser } = user[0]

                const token = await generateToken(user)

                res.status(200).json({ user: responseUser, token })
            }
        } catch (e) {
            return res.status(400).json({ message: e.message })
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        let user = (await UserStore.getByEmail(email))[0]

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.roles = await UserStore.getUserRoles(user.id)

        const isPasswordValid = bcrypt.compareSync(password, user.password_hash)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const { password_hash, ...responseUser } = user

        const token = await generateToken(user)

        await UserStore.updateLogin(user.id, new Date())

        res.status(200).json({ user: responseUser, token })
    }

    async refresh(req, res) {
        try {
            let user = req.user

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            user.roles = await UserStore.getUserRoles(user.id)

            const token = await generateToken(user)

            await UserStore.updateLogin(user.id, new Date())

            res.status(200).json({ user, token })
        } catch (e) {
            return res.status(400).json({ message: e.message })
        }
    }

    async me(req, res) {
        let user = await UserStore.getById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.roles = await UserStore.getUserRoles(user.id)

        res.status(200).json({ user })
    }
}

module.exports = new AuthController()
