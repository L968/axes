const { Model, DataTypes } = require('sequelize');

class Request extends Model {
    static init(connection){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            requester_user_id:   DataTypes.INTEGER,
            requestee_user_id:   DataTypes.INTEGER,
            status_id:           DataTypes.INTEGER,
            cancellation_reason: DataTypes.TEXT,
            cancellation_date:   DataTypes.DATE
        }, { sequelize: connection });
    }
}

module.exports = Request;