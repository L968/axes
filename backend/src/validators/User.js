const { Segments, Joi } = require('celebrate');

module.exports = {

    create: {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            id_number: Joi.number().required(),
            login: Joi.string().required().min(3),
            password: Joi.string().required().min(6),
            email: Joi.string().required().email(),
            department_id: Joi.number().required()
        })
    },

}