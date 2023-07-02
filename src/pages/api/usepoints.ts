// @ts-nocheck
import dbConnect from '../../lib/db.ts';
import { verify } from '../../lib/jwt.ts';
import UserStats from '../../models/userStats.ts';

export default async function handler(req, res) {
  const authHeader = req.headers.authentication;
  const userid = verify(authHeader);

  if (!userid) return res.status(500).send('Could not verify your token');

  if (req.method === 'POST') {
    try {
      await dbConnect();

      const userStats = await UserStats.findOne({ userid });
      let points = parseInt(userStats.points);

      let stats = userStats.stats;
      if (points > 0) {
        stats[req.body.stat] += 1;
        points -= 1;
        await UserStats.findByIdAndUpdate(userStats._id, { stats, points });
      }

      return res.status(200).json((await UserStats.findOne({ userid })).tasks);
    } catch (error) {
      return res.status(500).send('Could not complete your task: ' + error);
    }
  }
}
