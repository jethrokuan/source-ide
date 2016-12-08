import ShareDB from 'sharedb';
import shareDBMongo from 'sharedb-mongo';

const url = 'mongodb://localhost:27017/source';
const backend = new ShareDB({
  db: shareDBMongo(url),
});

export default backend;
