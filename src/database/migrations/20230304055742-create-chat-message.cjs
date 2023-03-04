'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChatMessages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      chat_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Chats',
          key: 'id'
        }
      },
      user_prompt: {
        type: Sequelize.STRING(2048)
      },
      gpt_response: {
        type: Sequelize.STRING(2048)
      },
      dalle_prompt: {
        type: Sequelize.ARRAY(Sequelize.STRING(1024))
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChatMessages');
  }
};