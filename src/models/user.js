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

UserSchema.methods.registerUser = async function () {
  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hash(this.password, salt);
    await this.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, secretOrKey, { expiresIn: '1d' });
};

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
