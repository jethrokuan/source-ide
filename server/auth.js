import passport from 'koa-passport';
import LocalStrategy from 'passport-local';

import User from './models/user';

User.findOne({ username: 'test' }, (err, testUser) => {
  if (!testUser) {
    console.log('test user does not exist, creating...');
    testUser = new User({
      username: 'test',
      password: 'test',
    });

    testUser.save();
  }
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const LocalStrat = LocalStrategy.Strategy;

passport.use(new LocalStrat((username, password, done) => {
  User.findOne({
    username,
    password,
  }, done);
}));
