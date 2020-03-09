const Joi = require('joi');

module.exports.signupValidator = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

module.exports.loginValidator = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

module.exports.tokenValidator = {
    query: {
        token: Joi.string().required()
    }
};

module.exports.tokenLoginValidator = {
    body: {
        token: Joi.string().required()
    }
};