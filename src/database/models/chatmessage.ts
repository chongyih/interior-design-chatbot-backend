import { DataTypes } from 'sequelize';
import db from '../'
import Chat from './chat';

const ChatMessage = db.define('ChatMessage', {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chat_id: {
    type: DataTypes.UUIDV4,
    references: {
      model: Chat,
      key: 'id'
    }
  },
  user_prompt: DataTypes.STRING(2048),
  gpt_response: DataTypes.STRING(2048),
  dalle_prompt: DataTypes.ARRAY(DataTypes.STRING(1024)),
  full_response: DataTypes.STRING(65535)
});
(async () => {
  await db.sync()
})();

export default ChatMessage;