const BaseValidator = require('./BaseValidator')
const UserStore = require('../stores/UserStore')

class UserValidator extends BaseValidator {
    getSchema() {
        return {
            username: this.getSchemaClass().string().required(),
            realname: this.getSchemaClass().string().required(),
            email: this.getSchemaClass().string().email().required(),
            password: this.getSchemaClass().string().min(6).max(100).required(),
        }
    }

    async validateProject(data) {
        this.validate(this.getSchema(), data)

        const userByEmail = await UserStore.getByEmail(data.email)
        if (userByEmail.email === data.email) {
            throw new Error('Email already in use')
        }

        return true
    }
}

module.exports = new UserValidator()
