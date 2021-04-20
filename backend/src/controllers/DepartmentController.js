const Department = require('../models/Department');

module.exports = {

    async index(request, response) {
        const departments = await Department.findAll();

        if (departments.length === 0) {
            return response.status(404).json({ message: "There are no departments registered in the system" });
        }

        return response.json(departments);
    },

    async create(request, response) {
        try {
            const { id } = await Department.create(request.body);

            return response.json({ department_id: id });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                const column = error.errors[0].path.replace('User.', '').replace('_', ' ');
                return response.status(409).json({ message: `This ${column} is already in use` });
            }

            throw error;
        }
    },

}