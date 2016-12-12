import mongoose from 'mongoose';
import Codepad from './codepad';

const Schema = mongoose.Schema;

const gistSchema = new Schema({
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  code: { type: Schema.Types.ObjectId, ref: 'codepad' },
  testcase: { type: Schema.Types.ObjectId, ref: 'codepad' },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

gistSchema.pre('save', async function presave(next) {
  const now = new Date();
  this.updatedAt = now;
  if (this.isNew) {
    this.createdAt = now;
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
