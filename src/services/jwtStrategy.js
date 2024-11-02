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
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
