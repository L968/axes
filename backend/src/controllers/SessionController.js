const User = require('../models/User');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = {

    async create(req, res)
    {
        try
        {
            let { login, password } = req.body;

            login = login.toLowerCase();

            const user = await User.findOne({
                attributes: ['user_id', 'password'],
                where: { login: login }
            });

            if (!user || (user.password !== password))
            {
                return res.status(403).json({ error: "Your login credentials don't match an account in our system" });
            }

            const token = jwt.sign({ user_id: user.user_id }, authConfig.secret, { expiresIn: 86400 });

            return res.status(200).json({ user_id: user.user_id, token: token });
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).json({ error: 'An unexpected error has occured, please try again later.' });
        }
    },

}