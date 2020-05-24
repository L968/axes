const { Segments, Joi } = require('celebrate');

module.exports = {
    create: {
        [Segments.BODY]: Joi.object().keys({
            name:               Joi.string().required().min(2),
            description:        Joi.string().allow(null),
            type_id:            Joi.number().integer().required(),
            parent_resource_id: Joi.number().integer().allow(null)
        })
    },

    update: {
        [Segments.BODY]: Joi.object().keys({
            name:               Joi.string().required().min(2),
            description:        Joi.string().allow(null),
            type_id:            Joi.number().integer().required(),
            parent_resource_id: Joi.number().integer().allow(null),
            active:             Joi.bool().required()
        }),
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().integer().required()
        })
    },

}