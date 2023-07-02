import mongoose from 'mongoose';

const userTaskSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Userid is required!'],
    },
    tasks: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.UserTasks || mongoose.model('UserTasks', userTaskSchema);
