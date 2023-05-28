import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    lastReq: {
      type: Number,
      required: true
    },
    admin: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Hash the password
userSchema.methods.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Compare the passwords
userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
  return await bcrypt.compare(inputtedPassword, hashedPassword);
};

// Generate jwt token
userSchema.methods.generateJwtToken = async (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};

export const User = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator, {
  message: '{PATH} Already in use!'
});
