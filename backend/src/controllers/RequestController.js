const connection = require('../database/connection');
const Request = require('../models/Request');
const Request_Resource = require('../models/Request_Resource');

module.exports = {

    async create(request, response) {
        const transaction = await connection.transaction();

        try
        {
            const { requester_user_id, requestee_user_id, resources } = request.body;

            const _request = await Request.create({
                requester_user_id,
                requestee_user_id,
                status_id: 1
            }, { transaction });

            console.log(_request.requester_user_id);

            for (const resource of resources) {
                const { id: resource_id, include_exclude } = resource;

                await Request_Resource.create({
                    request_id: _request.id,
                    resource_id: resource_id,
                    include_exclude
                }, { transaction });
            }

            await transaction.commit();

            return response.json({ request_id: _request.id });
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