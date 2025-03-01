const Joi = require('joi')
const UserStore = require('../stores/UserStore')

class BaseValidator {
    getSchemaClass() {
        return Joi
    }

    validate(schemaObj, data) {
        const schema = Joi.object(schemaObj)
        const result = schema.validate(data)

        if (result.error) {
            throw new Error(result.error.details[0].message)
        }
    }
}

module.exports = BaseValidator
