import { Router } from 'express';

import User from '../models/user.js';

const router = Router();

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'User does not exist' });
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const accessToken = user.generateJWT();

    return res.status(200).header('Authorization', accessToken).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const message =
        existingUser.email === email ? 'Email is in use' : 'Username is in use';
      return res.status(409).json({ message });
    }

    const newUser = new User({
      email,
      password,
      username,
    });

    await newUser.registerUser();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

export default router;
