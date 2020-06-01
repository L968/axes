const connection = require('../database/connection');
const Request = require('../models/Request');
const Request_Resources = require('../models/Request_Resources');

module.exports = {

    async create(req, res) {
        const transaction = await connection.transaction();

        try
        {
            const { requester_user_id, requestee_user_id, resources } = req.body;

            const response = await Request.create({
                requester_user_id,
                requestee_user_id,
                status_id: 1
            }, { transaction });

            const request_id = response.null;

            for (let i = 0; i < resources.length; i++) {
                const resource = resources[i];

                const { resource_id, type } = resource;

                await Request_Resources.create({
                    request_id,
                    resource_id,
                    type
                }, { transaction });
            }

            await transaction.commit();

            return res.json({ request_id });
        }
        catch (error)
        {
            if (transaction) {
                transaction.rollback();
            }

            throw error;
        }
    },

}