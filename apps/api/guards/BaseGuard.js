// BaseGuard is a class that all guards should extend from. It provides a base implementation of the guard interface.
// It is not meant to be used directly, but rather extended from.
const jwt = require('jsonwebtoken')
require('dotenv').config()

class BaseGuard {
    constructor() {
        this.secret = process.env.JWT_SECRET
        this.exipresIn = Number(process.env.JWT_EXPIRES_IN)
        this.jwt = jwt

        // Bind functions
        this.canActivate = this.canActivate.bind(this)
        this.middleware = this.middleware.bind(this)
        this.checkToken = this.checkToken.bind(this)
    }

    /**
     * This method checks if the token is valid and not expired.
     *
     * @param req
     * @returns {Promise<boolean>}
     */
    async checkToken(req) {
        const authHeader = req.headers['authorization']

        if (!authHeader) return false
        if (!authHeader.toLowerCase().includes('bearer')) return false

        const token = authHeader.split(' ')[1]
        if (!token) return false

        // Check if token is expired
        const decodedToken = this.jwt.decode(token, { complete: true })

        if (decodedToken.payload.exp * 1000 < Date.now()) return false

        try {
            req.data = this.jwt.verify(token, this.secret)
            req.user = req.data.user
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    /**
     * This method should be implemented by the extending class.
     *
     * @param req
     * @returns {Promise<boolean>}
     */
    async canActivate(req) {
        return await this.checkToken(req)
    }

    /**
     * This method returns the middleware function that will be used to check if the user is allowed to access the resource
     *
     * @returns {function(*, *, *): Promise<void>}
     */
    async middleware(req, res, next) {

        const isAllowed = await this.canActivate(req)

        if (isAllowed) {
            return next()
        } else {
            return res.status(401).json({ message: 'Unauthorized' }).end()
        }
    }
}

module.exports = BaseGuard
