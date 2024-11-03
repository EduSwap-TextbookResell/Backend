import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import secretOrKey from '../configs/jwt.js';

import User from '../models/user.js';

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    },
    function (payload, done) {
      User.findById(payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => done(err));
    },
  ),
);
