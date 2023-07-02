import mongoose from 'mongoose';

const userStatsSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Userid is required!'],
    },
    lvl: {
      type: Number,
      default: 1,
    },
    points: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    str: {
      type: Number,
      default: 10,
    },
    hel: {
      type: Number,
      default: 10,
    },
    def: {
      type: Number,
      default: 10,
    },
    agi: {
      type: Number,
      default: 10,
    },
    mag: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.UserStats || mongoose.model('UserStats', userStatsSchema);
