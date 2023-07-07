import mongoose from 'mongoose';

const userStatsSchema = new mongoose.Schema(
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
    stats: {
      type: Object,
      default: {
        str: 10,
        hel: 10,
        def: 10,
        agi: 10,
        mag: 10,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.UserStats || mongoose.model('UserStats', userStatsSchema);
