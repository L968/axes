const Joi = require('@hapi/joi');
const User = require('../models/User');

module.exports = {

    detail: (req, res , next) => {
        const validation = options.detail.validate({ id: req.params.id });

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        next();
    },

    create: async (req, res, next) => {
        const validation = options.create.validate(req.body);

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        const user = await User.findOne({
            attributes: ['id'],
            where: { login: req.body.login }
        });

        if (user) {
            return res.status(409).json({ message: 'This login is already in use' });
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