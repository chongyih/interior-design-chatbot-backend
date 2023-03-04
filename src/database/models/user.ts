import { DataTypes } from 'sequelize';
import db from '../'
import Chat from './chat';

const User = db.define('User', {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING
});
(async () => {
  await db.sync()
})();

User.hasMany(Chat, {
  foreignKey: 'user_id',
  as: 'chats',
  onDelete: 'CASCADE'
})

export default User