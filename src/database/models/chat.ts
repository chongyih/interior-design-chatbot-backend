import { DataTypes } from 'sequelize';
import User from './user';
import ChatMessage from './chatmessage';
import db from '../'

const Chat = db.define('Chat', {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUIDV4,
    references: {
      model: User,
      key: 'id'
    }
  }
});
(async () => {
  await db.sync()
})();

Chat.hasMany(ChatMessage, {
  foreignKey: 'chat_id',
  as: 'messages',
  onDelete: 'CASCADE'
})

export default Chat;