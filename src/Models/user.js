import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  user: {
    type: 'string',
    unique: true,
  },
});
