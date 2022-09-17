import { Request, Response } from 'express';
import { User } from '../../db/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

export default async function register(req: Request, res: Response) {
  const { username, password, name } = req.body;

  if (!username || !password || !name)
    return res.status(400).json({ message: 'Missing required fields' });

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({
    username,
    password,
    name,
    followers: [],
    followings: [],
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await newUser.save();

  const payload = {
    user: {
      id: newUser.id,
    },
  };

  jwt.sign(payload, config.get('jwtSecret'), {}, (err, token) => {
    if (err) res.status(500).json({ message: 'Internal Server error' });
    res.status(201).json({ token });
  });
}
