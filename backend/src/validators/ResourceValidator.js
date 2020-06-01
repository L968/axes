const Joi = require('@hapi/joi');

module.exports = {
    create: (req, res, next) => {
        const validation = options.create.validate(req.body);

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        next();
    },

    update: (req, res, next) => {
        const { id } = req.params;
        const validation = options.update.validate({ id, ...req.body });

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        next();
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