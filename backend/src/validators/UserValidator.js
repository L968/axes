const Joi = require('@hapi/joi');
const User = require('../models/User');

module.exports = {

    detail: (request, response, next) => {
        const validation = options.detail.validate({ id: request.params.id });

        if (validation.error) {
            return response.status(400).json({ message: validation.error.message });
        }

        return next();
    },

    create: async (request, response, next) => {
        const validation = options.create.validate(request.body);

        if (validation.error) {
            return response.status(400).json({ message: validation.error.message });
        }

        return next();
    },

}

const options = {
    create: Joi.object().keys({
        name:          Joi.string().required(),
        id_number:     Joi.string().required(),
        password:      Joi.string().required().min(6),
        email:         Joi.string().email().allow(null),
        department_id: Joi.number().integer().required()
    }),

    detail: Joi.object().keys({
        id: Joi.number().integer().required()
    }),
}