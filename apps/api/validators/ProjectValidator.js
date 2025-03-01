const BaseValidator = require('./BaseValidator')

class ProjectValidator extends BaseValidator {
    constructor() {
        super()
    }

    getSchema() {
        return {
            title: this.getSchemaClass().string().min(3).max(255).required(),
            description: this.getSchemaClass()
                .string()
                .min(3)
                .max(255)
                .required(),
            clubId: this.getSchemaClass().number().required(),
            profile_image: this.getSchemaClass()
                .string()
                .min(3)
                .max(255)
                .required(),
            banner_image: this.getSchemaClass()
                .string()
                .min(3)
                .max(255)
                .required(),
        }
    }

    validateProject(data) {
        this.validate(this.getSchema(), data)
    }
}

module.exports = new ProjectValidator()
