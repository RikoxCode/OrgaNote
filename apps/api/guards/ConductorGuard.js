const BaseGuard = require('./BaseGuard')

class ConductorGuard extends BaseGuard {
    async canActivate(req) {
        if (!(await this.checkToken(req))) return false

        return req.data.user.roles.some(
            (role) =>
                role.title.toLowerCase().includes('conductor') ||
                role.title.toLowerCase().includes('admin')
        )
    }
}

module.exports = new ConductorGuard()
