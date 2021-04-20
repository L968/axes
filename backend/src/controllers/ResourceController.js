const Resource = require('../models/Resource');

module.exports = {

    async index(request, response) {
        const resources = await Resource.findAll();

        if (resources.length === 0) {
            return response.status(404).json({ message: "There are no resources registered in the system" });
        }

        return response.json(resources);
    },

    async create(request, response) {
        const { name, description, type_id, parent_resource_id } = request.body;

        const { id } = await Resource.create({
            name,
            description,
            type_id,
            parent_resource_id
        });

        return response.status(201).json({ resource_id: id });
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, description, type_id, parent_resource_id, active } = request.body;

        await Resource.update({
            name,
            description,
            type_id,
            parent_resource_id,
            active
        },
        {
            where: { id: id }
        });

        return response.json({ name, description, type_id, parent_resource_id, active });
    },

}