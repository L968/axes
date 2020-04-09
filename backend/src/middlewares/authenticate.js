const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token){
		return res.status(401).send({ error: 'No token provided' });
	}

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err){
			return res.status(401).send({ error: 'Invalid token' });
		}

		req.user_id = decoded.id;
		return next();
	});
};