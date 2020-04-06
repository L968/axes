module.exports =
{
    development: {
        dialect: 'sqlite',
        storage: './src/database/db.sqlite3',
        define: {
            timestamps: false,
            freezeTableName: true
        },
        query: {
            raw: true
        }
    },

    test: {
        dialect: 'sqlite',
        storage: './src/database/test.sqlite3',
        define: {
            timestamps: false,
            freezeTableName: true
        },
        query: {
            raw: true
        }
    }
};