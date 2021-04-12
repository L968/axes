const Joi = require('@hapi/joi');

module.exports = {
    create: async (request, response, next) => {
        const validation = options.create.validate(request.body);

        if (validation.error) {
            return response.status(400).json({ message: validation.error.message });
        }

        return next();
    },

    update: async (request, response, next) => {
        const { id } = request.params;
        const validation = options.update.validate({ id, ...request.body });

        if (validation.error) {
            return response.status(400).json({ message: validation.error.message });
        }

        return next();
    },
}

const options = {
    create: Joi.object().keys({
        name:               Joi.string().required().min(2),
        description:        Joi.string().allow(null),
        type_id:            Joi.number().integer().required(),
        parent_resource_id: Joi.number().integer().allow(null)
    }),

    update: Joi.object().keys({
        id:                 Joi.number().integer().required(), // params
        name:               Joi.string().required().min(2),
        description:        Joi.string().allow(null),
        type_id:            Joi.number().integer().required(),
        parent_resource_id: Joi.number().integer().allow(null),
        active:             Joi.bool().required()
    }),
}