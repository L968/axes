'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table \`resource\`
      (
        \`id\`                 INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
        \`name\`               VARCHAR(255) NOT NULL UNIQUE,
        \`description\`        TEXT,
        \`type_id\`            INTEGER      NOT NULL,
        \`parent_resource_id\` INTEGER,
        \`active\`             BOOLEAN      NOT NULL CHECK (active IN (0,1)) DEFAULT 1
      );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('resource');
  }
}