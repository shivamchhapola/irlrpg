// @ts-nocheck
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
      unique: [true, 'Username has to be unique!'],
      maxLength: 20,
    },
    name: {
      type: String,
      required: [true, 'Name is required!'],
      maxLength: 40,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'Email has to be unique!'],
      maxLength: 500,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      maxLength: 150,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPass = async function (password) {
  let match = false;
  await bcrypt.compare(password, this.password).then((res) => (match = res));
  return match;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
