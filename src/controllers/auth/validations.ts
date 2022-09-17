import { Request, Response } from 'express';
import { User } from '../../db/models/User';

export async function checkUsernameAvailability(req: Request, res: Response) {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({
      message: 'Username already taken',
    });
  }
}

export async function checkEmailAvailability(req: Request, res: Response) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: 'Email already regsietered',
    });
  }
}
