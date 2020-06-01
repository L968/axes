const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const users = await User.findAll();

        if (users.length === 0) {
            return res.status(404).json({ message: "There are no users registered in the system" });
        }

        return res.json(users);
    },

    async detail(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    },

    async create(req, res) {
        let { name, id_number, login, password, email, department_id } = req.body;

        name = name.toUpperCase();
        login = login.toLowerCase();
        email = email.toLowerCase();

        const user = await User.findOne({
            attributes: ['id'],
            where: { login: login }
        });

        if (user) {
            return res.status(409).json({ message: 'This login is already in use' });
        }

        const response = await User.create({
            name,
            id_number,
            login,
            password,
            email,
            department_id
        });

        return res.status(201).json({ id: response.null });
    },

    async update(req, res) {
        res.send('NOT IMPLEMENTED USER UPDATE');
    },

}