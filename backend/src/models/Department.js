const { Model, DataTypes } = require('sequelize');

class Department extends Model {
    static init(connection){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name:   DataTypes.STRING,
            number: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        }, { sequelize: connection });
    }
}

module.exports = Department;