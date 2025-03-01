const UserStore = require('../stores/UserStore')
const UserValidator = require('../validators/UserValidator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthController {
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

                const user = await UserStore.create(
                    username,
                    email,
                    passwordHash,
                    realname,
                    createdAt,
                    updatedAt,
                    loginAt
                )

                const { password_hash, ...responseUser } = user[0]

                const token = jwt.sign(
                    { user: responseUser },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    }
                )

                res.status(200).json({ user: responseUser, token })
            }
        } catch (e) {
            return res.status(400).json({ message: e.message })
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        const user = await UserStore.getByEmail(email)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const { password_hash, ...responseUser } = user

        const token = jwt.sign({ user: responseUser }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })

        res.status(200).json({ user: responseUser, token })
    }

    async refresh(req, res) {
        try {
            const user = await UserStore.getById(req.user.id)

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            })

            res.status(200).json({ user, token })
        } catch (e) {
            return res.status(400).json({ message: e.message })
        }
    }

    async me(req, res) {
        const user = await UserStore.getById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ user })
    }
}

module.exports = new AuthController()
