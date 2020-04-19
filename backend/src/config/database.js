module.exports =
{
    development:
    {
        dialect: 'sqlite',
        storage: './src/database/db.sqlite3',
        define:
        {
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        query:
        {
            raw: true
        }
    },

    test:
    {
        dialect: 'sqlite',
        storage: './src/database/test.sqlite3',
        define:
        {
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        query:
        {
            raw: true
        }
    },
};