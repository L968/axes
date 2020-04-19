'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table \`resource\`
      (
        \`reso_id\`        INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
        \`name\`           VARCHAR(255) NOT NULL UNIQUE,
        \`description\`    TEXT,
        \`type\`           INTEGER      NOT NULL,
        \`father_reso_id\` VARCHAR(255),
        \`active\`         BOOLEAN      NOT NULL CHECK (active IN (0,1)) DEFAULT 1,
        \`created_at\`     DATE         NOT NULL,
        \`updated_at\`     DATE         NOT NULL
      );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('resource');
  }
};
