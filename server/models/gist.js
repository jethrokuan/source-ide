import mongoose from 'mongoose';
import Codepad from './codepad';

const Schema = mongoose.Schema;

const gistSchema = new Schema({
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  code: { type: Schema.Types.ObjectId, ref: 'codepad' },
  testcase: { type: Schema.Types.ObjectId, ref: 'codepad' },
}, {
  timestamps: true,
});

gistSchema.pre('save', async function presave(next) {
  if (this.isNew) {
    const code = new Codepad();
    const testcase = new Codepad();

    console.log(code);
    this.code = code.id;
    this.testcase = testcase.id;
  }
  next();
});

module.exports = mongoose.model('Gist', gistSchema);
