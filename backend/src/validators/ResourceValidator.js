const Joi = require('@hapi/joi');
const Resource = require('../models/Resource');

module.exports = {
    create: async (req, res, next) => {
        const validation = options.create.validate(req.body);

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        if (await nameIsAlreadyUsed(req.body.name)) {
            return res.status(409).json({ message: "There's already a resource with this name" });
        }

        next();
    },

    update: async (req, res, next) => {
        const { id } = req.params;
        const validation = options.update.validate({ id, ...req.body });

        if (validation.error) {
            return res.status(400).json({ message: validation.error.message });
        }

        const resource = await Resource.findByPk(id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.name !== req.body.name) {
            if (await nameIsAlreadyUsed(req.body.name)) {
                return res.status(409).json({ message: "There's already a resource with this name" });
            }
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

async function nameIsAlreadyUsed(name) {
    const response = await Resource.findOne({
        attributes: ['id'],
        where: { name: name }
    });

    return response == null ? false : true;;
}