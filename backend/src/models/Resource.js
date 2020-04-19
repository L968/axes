const { Model, DataTypes } = require('sequelize');

class Resource extends Model {
    static init(connection){
        super.init({
            reso_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name:           DataTypes.STRING,
            description:    DataTypes.TEXT,
            type:           DataTypes.INTEGER,
            father_reso_id: DataTypes.STRING,
            active:         DataTypes.BOOLEAN
        }, { sequelize: connection });
    }
}

module.exports = Resource;