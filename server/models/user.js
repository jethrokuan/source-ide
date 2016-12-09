import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = {
  username: String,
  password: String,
  facebook_id: String,
  google_id: String,
  gists: [{ type: Schema.Types.ObjectId, ref: 'Gist' }],
};

module.exports = mongoose.model('User', userSchema);
