const { Model, DataTypes } = require('sequelize');

class Request_Resource extends Model {
    static init(connection){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            request_id:          DataTypes.INTEGER,
            resource_id:         DataTypes.INTEGER,
            include_exclude:     DataTypes.STRING,
            completed:           DataTypes.BOOLEAN,
            responsible_user_id: DataTypes.INTEGER
        }, { sequelize: connection });
    }
}

module.exports = Request_Resource;