const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {

    async create(request, response) {
        let { login, password } = request.body;

        login = login.toLowerCase();

        const user = await User.findOne({
            attributes: ['id', 'password'],
            where: { login: login }
        });

        if (!user || (user.password !== password)) {
            return response.status(403).json({ message: "Your login credentials don't match an account in our system" });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

        return response.json({ id: user.id, token: token });
    },

}