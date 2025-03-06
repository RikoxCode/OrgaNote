const BaseGuard = require('./BaseGuard')

class ManagerGuard extends BaseGuard {
    async canActivate(req) {
        if (!(await this.checkToken(req))) return false

        return req.data.user.roles.some(
            (role) =>
                role.title.toLowerCase().includes('manager') ||
                role.title.toLowerCase().includes('conductor') ||
                role.title.toLowerCase().includes('admin')
        )
    }
}

module.exports = new ManagerGuard()
