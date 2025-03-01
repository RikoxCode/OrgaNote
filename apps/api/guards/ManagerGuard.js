const BaseGuard = require('./BaseGuard')

class ManagerGuard extends BaseGuard {
    async canActivate(req) {
        if (!(await this.checkToken(req))) return false

        return req.user.roles.some((role) =>
            role.title.toLowerCase().includes('manager')
        )
    }
}
