import { Request, Response } from 'express';
import { User } from '../../db/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

export default async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: 'User does not exist' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(payload, config.get('jwtSecret'), {}, (err, token) => {
    if (err) res.status(500).json({ msg: 'Internal Server error' });
    res.status(201).json({ token, userId: user.id });
  });
}
