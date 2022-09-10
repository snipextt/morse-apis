import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../db/models/User';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: 'You must be logged in to do this action',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    jwt.verify(
      token,
      config.get('jwtSecret'),
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            error: 'You must be logged in to do this action',
          });
        }
        const user = await User.findById(decoded.user.id);
        if (!user)
          return res.status(401).json({ error: 'User does not exist' });
        (req as any).user = user;
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({
      error: 'You must be logged in to do this action',
    });
  }
}
