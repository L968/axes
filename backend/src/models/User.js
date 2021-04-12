const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name:                DataTypes.STRING,
            id_number:           DataTypes.STRING,
            password:            DataTypes.STRING,
            password_expiration: DataTypes.DATE,
            email:               DataTypes.STRING,
            department_id:       DataTypes.INTEGER,
            active:              DataTypes.BOOLEAN
        }, { sequelize: connection, });
    }
}

module.exports = User;