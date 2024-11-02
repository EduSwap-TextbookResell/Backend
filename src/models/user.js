import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import secretOrKey from '../configs/jwt.js';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      minlength: 2,
      maxlength: 20,
      match: [/^[a-zA-Z0-9_]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    role: { type: String, default: 'USER' },
    bio: String,
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    email: this.email,
    username: this.username,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, secretOrKey, { expiresIn: '1d' });
};

UserSchema.methods.registerUser = async function (newUser) {
  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
