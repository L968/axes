const { Model, DataTypes } = require('sequelize');

class Resource extends Model {
    static init(connection){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name:               DataTypes.STRING,
            description:        DataTypes.TEXT,
            type_id:            DataTypes.INTEGER,
            parent_resource_id: DataTypes.STRING,
            active:             DataTypes.BOOLEAN
        }, { sequelize: connection });
    }
}

module.exports = Resource;