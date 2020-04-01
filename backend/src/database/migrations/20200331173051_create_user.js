
exports.up = function(knex) {

    let create_user = `
    create table \`user\`
    (
        \`user_id\`             INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
        \`name\`                VARCHAR(255) NOT NULL,
        \`id_number\`           FLOAT        NOT NULL,
        \`login\`               VARCHAR(255) NOT NULL,
        \`password\`            VARCHAR(255) NOT NULL,
        \`password_expiration\` DATE         NOT NULL DEFAULT (DATETIME('now', 'localtime', '1 month')),
        \`email\`               VARCHAR(255) NOT NULL,
        \`department_id\`       FLOAT        NOT NULL,
        \`active\`              BOOLEAN      NOT NULL CHECK (active IN (0,1)) DEFAULT 1
    );
    `;

    return knex.schema.raw(create_user);
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
