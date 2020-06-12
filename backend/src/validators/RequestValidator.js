const Joi = require('@hapi/joi');
const User = require('../models/User');
const Resource = require('../models/Resource');

module.exports = {

    create: async (req, res, next) => {
        const validation = options.create.validate(req.body);

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        const errorMessage = await validateCreate(req.body);

        if (errorMessage) {
            return res.status(404).json({ message: errorMessage });
        }

        next();
    },

}

const options = {
    create: Joi.object().keys({
        requester_user_id: Joi.number().integer().required(),
        requestee_user_id: Joi.number().integer().required(),
        resources: Joi.array().required().items(Joi.object({
            id:    Joi.number().integer().required(),
            type:  Joi.any().valid('INCLUDE', 'EXCLUDE')
        }))
    }),
}

async function validateCreate(body) {
    const { requester_user_id, requestee_user_id, resources } = body;

    const requester_user = await User.findByPk(requester_user_id);
    if (!requester_user) {
        return 'Requester user not found';
    }

    const requestee_user = await User.findByPk(requestee_user_id);
    if (!requestee_user) {
        return 'Requestee user not found';
    }

    for (const item of resources) {
        const resource = await Resource.findByPk(item.id);

        if (!resource) {
            return `Resource id ${item.id} not found`;
        }
    }

    return null;
}