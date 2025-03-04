const BaseGuard = require('./BaseGuard')

class MemberGuard extends BaseGuard {
    async canActivate(req) {
        if (!(await this.checkToken(req))) return false

        console.log("member guard step 1")

        console.log(req.data.user)
        console.log(req.data.user.roles)

        if(!req.data.user.roles) return false

        console.log("member guard step 2")
        return req.data.user.roles.some((role) =>
            role.title.toLowerCase().includes('member') ||
            role.title.toLowerCase().includes('manager') ||
            role.title.toLowerCase().includes('conductor') ||
            role.title.toLowerCase().includes('admin')
        )
    }
}

module.exports = new MemberGuard()