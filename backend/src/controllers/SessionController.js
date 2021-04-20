const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {

    async create(request, response) {
        let { id_number, password } = request.body;

        id_number = id_number.toUpperCase();

        const user = await User.findOne({
            attributes: ['id', 'password'],
            where: { id_number: id_number }
        });

        if (!user || (user.password !== password)) {
            return response.status(403).json({ message: "Your login credentials don't match an account in our system" });
        }

        const token = jwt.sign({ user_id: user.id }, process.env.SECRET, { expiresIn: 86400 });

        return response.json({ user_id: user.id, token: token });
    },

}