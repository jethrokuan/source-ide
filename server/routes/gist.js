import Router from 'koa-router';
import backend from '../db';
import authenticated from '../lib/middlewares/authenticated';

import User from '../models/user';
import Gist from '../models/gist';

const router = new Router();

const createIfNeeded = (doc) => {
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create('');
    }
  });
};

router.use(authenticated());

router.get('/gists', async (ctx) => {
  let user = await User.findById(ctx.session.passport.user)
      .populate('gists')
      .exec();

  await ctx.render('gists/list', { gists: user.gists });
});

router.get('/gists/new', async (ctx) => {
  let gistid;
  const q = await User.findById(ctx.session.passport.user)
        .exec((err, user) => {
          if (err) throw err;
          const gist = new Gist({
            owner: user._id,
            participants: [],
          });
          
          gist.save();
          user.gists.push(gist._id);
          user.save();
          gistid = gist._id;
        });

  await ctx.redirect(`/gist/${gistid}`);
});

router.get('/gist/:id', async (ctx) => {
  const conn = backend.connect();
  const doc = conn.get('gists', ctx.params.id);
  createIfNeeded(doc);
  await ctx.render('gists/show');
});

module.exports = router;
