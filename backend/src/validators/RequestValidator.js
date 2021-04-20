const Joi = require('@hapi/joi');

module.exports = {

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
        requester_user_id: Joi.number().integer().required(),
        requestee_user_id: Joi.number().integer().required(),
        resources: Joi.array().required().items(Joi.object({
            id:    Joi.number().integer().required(),
            include_exclude:  Joi.any().valid('I', 'E')
        })),
    }),
}