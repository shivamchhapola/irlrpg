import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const verify = (authHeader) => {
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return false;
      }
      return user.id;
    });
  } else {
    return false;
  }
};
