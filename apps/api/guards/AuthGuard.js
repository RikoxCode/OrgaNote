const BaseGuard = require('./BaseGuard')

class AuthGuard extends BaseGuard {
    async canActivate(req) {
        return await this.checkToken(req)
    }
}

module.exports = new AuthGuard()
