const Resource = require('../models/Resource');

module.exports = {

    async index(req, res) {
        const resources = await Resource.findAll();

        if (resources.length === 0) {
            return res.status(404).json({ message: "There are no resources registered in the system" });
        }

        return res.json(resources);
    },

    async create(req, res) {
        const { name, description, type_id, parent_resource_id } = req.body;

        if (await nameIsAlreadyUsed(name)) {
            return res.status(409).json({ message: "There's already a resource with this name" });
        }

        const response = await Resource.create({
            name,
            description,
            type_id,
            parent_resource_id
        });

        return res.status(201).json({ id: response.null });
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, description, type_id, parent_resource_id, active } = req.body;

        const resource = await Resource.findByPk(id);

        if (resource == null) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        if (resource.name !== req.body.name) {
            if (await nameIsAlreadyUsed(req.body.name)) {
                return res.status(409).json({ message: "There's already a resource with this name" });
            }
        }

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

        return res.json({ name, description, type_id, parent_resource_id, active });
    },

}

async function nameIsAlreadyUsed(name) {
    const response = await Resource.findOne({
        attributes: ['id'],
        where: { name: name }
    });

    return response == null ? false : true;;
}