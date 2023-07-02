import dbConnect from '../../lib/db.js';
import { verify } from '../../lib/jwt.js';
import UserTasks from '../../models/userTasks.js';

export default async function handler(req, res) {
  const authHeader = req.headers.authentication;
  const userid = verify(authHeader);

  if (!userid) return res.status(500).send('Could not verify your token');

  if (req.method === 'POST') {
    try {
      await dbConnect();

      await UserTasks.findOneAndUpdate(
        { userid },
        {
          tasks: req.body.tasks,
        }
      );

      return res.status(200).json((await UserTasks.findOne({ userid })).tasks);
    } catch (error) {
      return res.status(500).send('Could not complete your task: ' + error);
    }
  }
}
