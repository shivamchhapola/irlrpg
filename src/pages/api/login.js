// @ts-nocheck
import dbconnect from '../../lib/db.js';
import User from '../../models/user.js';
import Joi from 'joi';
import { generateToken } from '../../lib/jwt.js';

export default async function handler(req, res) {
  const { username, password } = req.body;

  //Empty fields check
  if (!username) return res.status(500).send('"Username" not found in body');
  if (!password) return res.status(500).send('"Password" not found in body');

  //Check if the provided value in the username field is an Email address
  const isEmail = Joi.string()
    .email({ tlds: { allow: false } })
    .validate(username).error
    ? false
    : true;

  await dbconnect();

  //Finds an user with the provided Email
  const user = await User.findOne(isEmail ? { email: username } : { username });

  if (!user)
    return res
      .status(500)
      .send('Could not find an account with given Username/Email');

  const match = await user.matchPass(password);
  return match
    ? res.status(200).send(generateToken(user._id))
    : res.status(400).send('Incorrect Password or Username/Email');
}
