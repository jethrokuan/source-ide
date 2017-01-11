import Router from 'koa-router';

import authenticated from '../lib/middlewares/authenticated';

import User from '../models/user';
import Gist from '../models/gist';

const router = new Router();

router.use(authenticated());

// TODO: Convert into JSON API
router.get('/gists', async (ctx) => {
  const user = await User.findById(ctx.session.passport.user)
        .populate('gists')
        .exec();

  await ctx.render('gists/list', { gists: user.gists });
});

router.post('/gists/new', async (ctx) => {
  try {
    let gistid;
    await User.findById(ctx.session.passport.user)
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
    ctx.body = {
      status: 0,
      id: gistid,
    };
  } catch (err) {
    ctx.body = {
      status: 1,
      error: err,
    };
  }
});

// TODO: Convert to JSON API
router.get('/gist/:id', async (ctx) => {
  const q = await Gist.findById(ctx.params.id).exec((err, gist) => {
    if (err) throw err; 
    ctx.state.codeId = gist.code;
    ctx.state.testcaseId = gist.testcase;
  });
  
  await ctx.render('gists/show');
});

module.exports = router;
