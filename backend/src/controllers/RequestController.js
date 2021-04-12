const connection = require('../database/connection');
const Request = require('../models/Request');
const Request_Resources = require('../models/Request_Resources');

module.exports = {

    async create(request, response) {
        const transaction = await connection.transaction();

        try
        {
            const { requester_user_id, requestee_user_id, resources } = request.body;

            const { request_id: id } = await Request.create({
                requester_user_id,
                requestee_user_id,
                status_id: 1
            }, { transaction });

            for (const resource of resources) {
                const { id, type } = resource;

                await Request_Resources.create({
                    request_id,
                    resource_id: id,
                    type
                }, { transaction });
            }

            await transaction.commit();

            return response.json({ request_id });
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