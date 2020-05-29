'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      create table \`request\`
      (
        \`id\`                  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        \`requester_user_id\`   INTEGER NOT NULL,
        \`requestee_user_id\`   INTEGER NOT NULL,
        \`status_id\`           INTEGER NOT NULL,
        \`cancellation_reason\` TEXT,
        \`cancellation_date\`   DATE,
        \`created_at\`          DATE    NOT NULL,
        \`updated_at\`          DATE    NOT NULL
      );
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('request');
  }
};