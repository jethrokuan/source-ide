import ShareDB from 'sharedb';
import shareDBMongo from 'sharedb-mongo';

import mongoose from 'mongoose';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/source';

mongoose.connect(url);

const share = new ShareDB({
  db: shareDBMongo(url),
});

export default share;
