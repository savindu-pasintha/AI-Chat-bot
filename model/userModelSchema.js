import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true, },
  password: { type: String,required: true,},
  username: {type: String,default: ''},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.plugin(autoIncrement.plugin, {
  model: 'user',
  field: '_id',
  startAt: 1, // The starting ID value
  incrementBy: 1, // The increment value for each new ID
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;

