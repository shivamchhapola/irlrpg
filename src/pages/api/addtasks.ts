// @ts-nocheck
import dbConnect from '../../lib/db.ts';
import { verify } from '../../lib/jwt.ts';
import UserTasks from '../../models/userTasks.ts';

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
          $push: {
            tasks: req.body,
          },
        }
      );
      return res.status(200).json((await UserTasks.findOne({ userid })).tasks);
    } catch (error) {
      return res.status(500).send('Could not add your task');
    }
  }
}
