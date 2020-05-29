const { Model, DataTypes } = require('sequelize');

class Request_Resources extends Model {
    static init(connection){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            request_id:          DataTypes.INTEGER,
            resource_id:         DataTypes.INTEGER,
            type:                DataTypes.STRING,
            completed:           DataTypes.BOOLEAN,
            responsible_user_id: DataTypes.INTEGER
        }, { sequelize: connection });
    }
}

module.exports = Request_Resources;