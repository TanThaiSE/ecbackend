const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
// passport.use(
//   new LocalStrategy((username, password, done) => {
//     const user = User.findOne({ username: username, password: password });
//     if (user) return done(null, { id: user.id, role: user.role });
//     return done(null, false, { message: 'Incorrect' });
//   })
// );

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.id) return done(null, { id: jwt_payload.id, role: jwt_payload.role });
    return done(null, false);
  })
);

module.exports = passport;
