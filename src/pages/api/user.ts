// @ts-nocheck
import dbConnect from '../../lib/db.ts';
import { verify } from '../../lib/jwt.ts';
import User from '../../models/user.ts';
import UserStats from '../../models/userStats.ts';
import UserTasks from '../../models/userTasks.ts';

export default async function handler(req, res) {
  const authHeader = req.headers.authentication;
  const userid = verify(authHeader);

  if (!userid) return res.status(500).send('Could not verify your token');

  if (req.method === 'GET') {
    try {
      await dbConnect();
      const user = await User.findById(userid);
      const userStats = await UserStats.findOne({ userid: user._id });
      const userTasks = await UserTasks.findOne({ userid: user._id });
      return res.status(200).json({
        name: user.name,
        email: user.email,
        username: user.username,
        stats: userStats,
        tasks: userTasks.tasks,
      });
    } catch (error) {
      return res.status(500).send('Could not get user data: ' + error);
    }
  }
}
