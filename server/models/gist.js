import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gistSchema = {
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
};

module.exports = mongoose.model('Gist', gistSchema);
