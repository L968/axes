const connection = require('../database/connection');

module.exports = {

    async create(req, res) {
        let { login, password } = req.body;

        login = login.toUpperCase();

        const user = await connection('user')
        .select('user_id', 'password')
        .where('login', login)
        .first();

        if (!user) {
            return res.status(400).json({ error: "Your login credentials don't match an account in our system" });
        }

        const { user_id } = user;
        return res.status(200).json({ user_id });
    },

}