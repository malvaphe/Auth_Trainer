import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
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

// Generate jwt token
userSchema.methods.generateJwtToken = async (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};

export const User = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator, {
  message: '{PATH} Already in use!'
});
