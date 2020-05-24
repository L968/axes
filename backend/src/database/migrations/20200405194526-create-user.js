'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table \`user\`
      (
        \`id\`                  INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
        \`name\`                VARCHAR(255) NOT NULL,
        \`id_number\`           FLOAT        NOT NULL,
        \`login\`               VARCHAR(255) NOT NULL UNIQUE,
        \`password\`            VARCHAR(255) NOT NULL,
        \`password_expiration\` DATE         NOT NULL DEFAULT (DATETIME('now', 'localtime', '1 month')),
        \`email\`               VARCHAR(255) NOT NULL,
        \`department_id\`       FLOAT        NOT NULL,
        \`active\`              BOOLEAN      NOT NULL CHECK (active IN (0,1)) DEFAULT 1,
        \`created_at\`          DATE         NOT NULL,
        \`updated_at\`          DATE         NOT NULL
      );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};