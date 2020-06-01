const Joi = require('@hapi/joi');

module.exports = {
    create: (req, res, next) => {
        const validation = options.create.validate(req.body);

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        next();
    },
}

const options = {
    create: Joi.object().keys({
        login:    Joi.string().required(),
        password: Joi.string().required(),
    }),
}