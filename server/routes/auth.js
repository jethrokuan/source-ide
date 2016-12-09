import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/login', async (ctx) => {
  await ctx.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/gist/1000',
  failureRedirect: '/login',
}));

router.get('/logout', async (ctx) => {
  ctx.logout();
  ctx.redirect('/login');
});

module.exports = router;
