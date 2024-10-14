import User from '../models/user.js';

const get = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(`Error while getting user`, err.message);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' }); // Handle if test not found
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(`Error while deleting User`, err.message);
    next(err);
  }
};

export default {
  get,
  create,
  update,
  remove,
};
