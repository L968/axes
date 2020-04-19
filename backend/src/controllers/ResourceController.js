const Resource = require('../models/Resource');

module.exports = {

    async index(req, res) {
        try
        {
            const resources = await Resource.findAll();

            if(resources.lenght === 0) {
                return res.status(404).json({ message: "There are no resources registered in the system" });
            }

            return res.json(resources);
        }
        catch (error)
        {
            logger.error(error);
            return res.status(500).json({ message: 'An unexpected error has occured, please try again later' });
        }
    },

    async create(req, res) {
        try
        {
            let { name, description, type, father_reso_id } = req.body;

            const resource = await Resource.findOne({
                attributes: ['reso_id'],
                where: { name: name }
            });

            if (resource) {
                return res.status(409).json({ message: "There's already a resource with that name" });
            }

            const response = await Resource.create({
                name,
                description,
                type,
                father_reso_id
            });

            return res.status(201).json({ reso_id: response.null });
        }
        catch (error)
        {
            logger.error(error);
            return res.status(500).json({ message: 'An unexpected error has occured, please try again later' });
        }
    },

}