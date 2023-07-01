import dbconnect from '../../../lib/db.js';
import User from '../../../Models/user.js';
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import { generateToken } from '../../../lib/jwt.js';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const validationSchema = Joi.object({
  username: Joi.string().required().min(1).max(20),
  name: Joi.string().required().max(30),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: joiPassword
    .string()
    .min(8)
    .max(150)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1),
});

export default async function handler(req, res) {
  const { name, email, username, password } = req.body;

  //Empty fields check
  if (!name) return res.status(500).send('"Name" not found');
  if (!email) return res.status(500).send('"Email" not found');
  if (!password) return res.status(500).send('"Password" not found');
  if (!username) return res.status(500).send('"Username" not found');

  //Packs the data in a single variable
  const data = {
    username: username.toLowerCase(),
    name,
    email: email.toLowerCase(),
    password,
  };

  //Joi Validation using the Schema created above
  const validate = validationSchema.validate(data);
  if (validate.error)
    return res.status(400).send(validate.error.details[0].message);

  await dbconnect();

  //Checks if the Email already exists in the DB
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists)
    return res.status(500).send('An account with this Email already exists');

  //Inserts the data into User collection
  const user = await User.create(data).catch((err) => {
    return res.status(500).send('Could not create an account: ' + err);
  });

  if (user) {
    return res.status(200).send(generateToken(user._id));
  }
}
