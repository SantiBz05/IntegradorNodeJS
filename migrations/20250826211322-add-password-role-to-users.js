'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'moderador', 'cliente'),
      allowNull: false,
      defaultValue: 'cliente',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'role');
  }
};
