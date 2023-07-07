// @ts-nocheck
import dbConnect from '../../lib/db.js';
import { verify } from '../../lib/jwt.js';
import User from '../../models/user.js';
import UserStats from '../../models/userStats.js';
import UserTasks from '../../models/userTasks.js';

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
