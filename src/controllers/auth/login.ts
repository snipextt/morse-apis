import { Request, Response } from 'express';
import { User } from '../../db/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

export default async function login(req: Request, response: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return response.status(400).json({ msg: 'User does not exist' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return response.status(400).json({ msg: 'Invalid credentials' });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(payload, config.get('jwtSecret'), {}, (err, token) => {
    if (err) response.status(500).json({ msg: 'Internal Server error' });
    response.status(201).json({ token });
  });
}
