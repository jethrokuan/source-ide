import mongoose from 'mongoose';
import backend from '../db';
import Codepad from './codepad';

const Schema = mongoose.Schema;

const gistSchema = new Schema({
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  code: { type: Schema.Types.ObjectId, ref: 'codepad' },
  testcase: { type: Schema.Types.ObjectId, ref: 'codepad' },
});

gistSchema.pre('save', async function(next) {
  if (this.isNew) {
    const code = new Codepad({});
    const testcase = new Codepad({});
    await code.save();
    await testcase.save();

    this.code = code._id;
    this.testcase = testcase._id;
  }
  next();
});

module.exports = mongoose.model('Gist', gistSchema);
