import { Router } from 'express';

import requireLocalAuth from '../middlewares/requireLocalAuth.js';
import User from '../models/user.js';

const router = Router();

router.post('/login', requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  res.json({ token, me });
});

router.post('/register', async (req, res, next) => {
  const { email, password, name, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: 'Email is in use' });
    }

    try {
      const newUser = await new User({
        provider: 'email',
        email,
        password,
        username,
        name,
      });

      newUser.registerUser(newUser, (err, _) => {
        if (err) throw err;
        res.json({ message: 'Register success' });
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send(false);
});

export default router;
