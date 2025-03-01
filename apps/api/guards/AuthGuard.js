const BaseGuard = require('./BaseGuard')

class AuthGuard extends BaseGuard {
    async canActivate(req) {
        const authHeader = req.headers['authorization']
        if (!authHeader) return false

        const token = authHeader.split(' ')[1]
        if (!token) return false

        try {
            const decoded = jwt.verify(token, this.secret)
            req.user = decoded
            return true
        } catch (error) {
            return false
        }
    }
}
