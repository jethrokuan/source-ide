import mongoose from 'mongoose';

const userSchema = {
  username: String,
  password: String,
  facebook_id: String,
  google_id: String
}

module.exports = mongoose.model('User', userSchema);
