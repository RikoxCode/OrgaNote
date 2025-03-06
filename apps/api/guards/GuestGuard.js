const BaseGuard = require('./BaseGuard')

class GuestGuard extends BaseGuard {
    async canActivate(req) {
        if (!(await this.checkToken(req))) return false

        return req.data.user.roles.some((role) =>
            role.title.toLowerCase().includes('guest')
        )
    }
}

module.exports = new GuestGuard()
