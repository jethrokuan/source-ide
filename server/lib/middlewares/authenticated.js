export default function isAuthenticated() {
  return async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.redirect('/login');
    }
  };
};
