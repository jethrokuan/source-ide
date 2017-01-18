import mongoose from 'mongoose';
import backend from '../db';

const Schema = mongoose.Schema;

class CodePad {
  constructor() {
    const id = mongoose.Types.ObjectId();
    const conn = backend.connect();
    const doc = conn.get('codepad', id);
    doc.create({
      "code": "function() {hello;}",
      "testcases": "hellotest"
    });
    this.id = id;
    this.createdAt = Date.now();
  }
}

module.exports = CodePad;
