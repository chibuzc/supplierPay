const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

const {googleClientID, googleClientSecret} = require("../config/keys");


passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const exisitingUser = await User.findOne({ googleId: profile.id });
        if (exisitingUser) {
          return done(null, exisitingUser);
        }
        const user = await new User({
          googleId: profile.id,
          name: profile.displayName,
          photo: profile.photos[0].value
        }).save();
        return done(null, user);
      } catch (error) {
        console.log("Error => ", error);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});