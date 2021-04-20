const User = require('../models/User');

module.exports = {

    async index(request, response) {
        const users = await User.findAll();

        if (users.length === 0) {
            return response.status(404).json({ message: "There are no users registered in the system" });
        }

        return response.json(users);
    },

    async detail(request, response) {
        const { id } = request.params;

        const user = await User.findByPk(id);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.json(user);
    },

    async create(request, response) {
        try {
            let { name, id_number, password, email, department_id } = request.body;

            name = name.toUpperCase();
            id_number = id_number.toUpperCase();

            if (email) {
                email = email.toLowerCase();
            }

            const { id } = await User.create({
                name,
                id_number,
                password,
                email,
                department_id,
            });

            return response.status(201).json({ user_id: id });
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return response.status(404).json({ message: `This department does not exist in our system` });
            } else if (error.name === 'SequelizeUniqueConstraintError') {
                const column = error.errors[0].path.replace('User.', '').replace('_', ' ');
                return response.status(409).json({ message: `This ${column} is already in use` });
            }

            throw error;
        }
    },

    async update(request, response) {
        response.send('NOT IMPLEMENTED USER UPDATE');
    },

}