const JwtStrategy = require("passport-jwt").Strategy;
const Extractor = require("passport-jwt").ExtractJwt;
const Keys = require("../Config/Keys");
const UserSchema = require("../Schema/User");
const opts = {};
opts.jwtFromRequest = Extractor.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.JwtSecret;

module.exports = passport = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.provider === "Email") {
       
        UserSchema.findById(jwt_payload.id, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    })
  );
};
