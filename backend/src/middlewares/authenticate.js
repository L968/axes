const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const constants = require('../constants');

module.exports = (req, res, next) => {
	try
	{
		const token = req.headers.authorization;

		if (!token){
			return res.status(401).send({
				isAuthenticated: false,
				message: 'No token provided'
			});
		}

		jwt.verify(token, authConfig.secret, (err, decoded) => {
			if (err){
				return res.status(401).send({
					isAuthenticated: false,
					message: 'Invalid token'
				});
			}

			req.user_id = decoded.user_id;
			req.isAuthenticated = true;
			return next();
		});
	}
	catch (error)
	{
		logger.error(error);
		return res.status(500).json({
			isAuthenticated: false,
			message: constants.ERROR_MESSAGE
		});
	}

};