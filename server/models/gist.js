import mongoose from 'mongoose';
import backend from '../db';

const Schema = mongoose.Schema;

const gistSchema = new Schema({
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

gistSchema.pre('save', function(next) {
  if (this.isNew) {
    const conn = backend.connect();
    const doc = conn.get('gists', this._id);
    doc.fetch((err) => {
      if (err) throw err;
      if (doc.type === null) {
        doc.create('function hello() { return true; }');
      }
    });
  }
  next();
});

module.exports = mongoose.model('Gist', gistSchema);
