import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
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

export const User = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator, {
  message: '{PATH} Already in use!'
});
