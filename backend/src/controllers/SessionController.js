const User = require('../models/User');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = {

    async create(req, res) {
        let { login, password } = req.body;

        login = login.toLowerCase();

        const user = await User.findOne({
            attributes: ['id', 'password'],
            where: { login: login }
        });

        if (!user || (user.password !== password)) {
            return res.status(403).json({ message: "Your login credentials don't match an account in our system" });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 });

        return res.json({ id: user.id, token: token });
    },

}