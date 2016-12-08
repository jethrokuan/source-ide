import Router from 'koa-router';
import backend from '../db';

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('index');
});

const createIfNeeded = (doc) => {
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create('');
    }
  });
};

router.get('/gist/:id', async (ctx) => {
  const conn = backend.connect();
  const doc = conn.get("gists", ctx.params.id);
  createIfNeeded(doc);
  await ctx.render('index');
});

export default router;
