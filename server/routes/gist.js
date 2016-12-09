import Router from 'koa-router';

import authenticated from '../lib/middlewares/authenticated';

import User from '../models/user';
import Gist from '../models/gist';

const router = new Router();

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
        .exec(async (err, user) => {
          if (err) throw err;
          const gist = new Gist({
            owner: user._id,
            participants: [],
          });
          gistid = gist._id;
          await gist.save();
          user.gists.push(gist._id);
          await user.save(); 
        });

  await ctx.redirect(`/gist/${gistid}`);
});

router.get('/gist/:id', async (ctx) => {
  await ctx.render('gists/show');
});

module.exports = router;
