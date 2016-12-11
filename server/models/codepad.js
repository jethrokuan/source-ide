import mongoose from 'mongoose';
import backend from '../db';

const Schema = mongoose.Schema;

const codepadSchema = new Schema({});

codepadSchema.pre('save', function(next) {
  if (this.isNew) {
    const conn = backend.connect();
    const doc = conn.get('codepad', this._id);
    doc.create('function hello() { return true; }');
  }
  next();
});

module.exports = mongoose.model('codepad', codepadSchema);
