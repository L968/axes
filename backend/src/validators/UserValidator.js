const Joi = require('@hapi/joi');

module.exports = {
    create: (req, res, next) => {
        const validation = options.create.validate(req.body);

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        next();
    },

    detail: (req, res , next) => {
        const validation = options.detail.validate({ id: req.params.id });

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        next();
    },
}

const options = {
    create: Joi.object().keys({
        name:          Joi.string().required(),
        id_number:     Joi.number().integer().required(),
        login:         Joi.string().required().min(3),
        password:      Joi.string().required().min(6),
        email:         Joi.string().required().email(),
        department_id: Joi.number().integer().required()
    }),

    detail: Joi.object().keys({
        id: Joi.number().integer().required()
    }),
}