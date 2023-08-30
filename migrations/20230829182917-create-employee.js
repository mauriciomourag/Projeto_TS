'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
          type: Sequelize.STRING(128),
          allowNull: false
      },
      email: {
          type: Sequelize.STRING(128),
          allowNull: false,
          unique: true
      },

      salary: {
          type: Sequelize.STRING(128),
          allowNull: false,
      },

      companyID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'companies',
              key: 'id'
          }
      },

      roleID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'roles',
              key: 'id'
          }
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
  });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};