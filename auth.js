const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(
  new LocalStrategy(
    // The order is like this: username, pass, and done function which is a callback func.
    async (USERNAME, PASSWORD, done) => {
      // authentication logic
      try {
        const user = await Person.findOne({ username: USERNAME });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isPasswordMatch = await user.comparePassword(PASSWORD);
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (error) {
        return done(error);
      }
    },
  ),
);

module.exports = passport;
