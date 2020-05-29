'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table \`request_resources\`
      (
        \`id\`                  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        \`request_id\`          INTEGER NOT NULL,
        \`resource_id\`         INTEGER NOT NULL,
        \`type\`                INTEGER NOT NULL,
        \`completed\`           BOOLEAN NOT NULL CHECK (completed IN (0,1)) DEFAULT 0,
        \`responsible_user_id\` INTEGER,
        \`created_at\`          DATE    NOT NULL,
        \`updated_at\`          DATE    NOT NULL
      );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('request_resources');
  }
};