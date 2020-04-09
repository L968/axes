const { Segments, Joi } = require('celebrate');

module.exports = {
    create: {
        [Segments.BODY]: Joi.object().keys({
            login:    Joi.string().required(),
            password: Joi.string().required(),
        })
    },
}