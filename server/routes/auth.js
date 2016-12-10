import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/login', async (ctx) => {
  await ctx.render('auth/login');
});

router.get('/signup', async (ctx) => {
  await ctx.render('auth/signup');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/gists',
  failureRedirect: '/login',
}));

router.get('/logout', async (ctx) => {
  ctx.logout();
  ctx.redirect('/login');
});

module.exports = router;
